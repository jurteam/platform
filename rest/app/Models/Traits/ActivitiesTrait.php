<?php

namespace App\Models\Traits;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Activity;
use App\Models\Contract;
use App\Models\ContractStatus;
use Illuminate\Support\Facades\Lang;

trait ActivitiesTrait
{
    public function activities()
    {
        return $this->hasMany(Activity::class)->exceptFuture();
    }

    public function storeActivity($params)
    {
        $status = ContractStatus::byCode($params->code)->firstOrFail();
        $user = User::byWallet($params->header('wallet'))->first();

        return $this->recordActivities(array_merge($params->all(), [
            'status' => $status->label,
            'status_code' => $status->code,
            'to_wallet' => $this->getSendTo($params->header('wallet')),
            'wallet' => $params->header('wallet')
        ]), $user);
    }

    public function recordActivities($params, $user)
    {
        $attributes = array_merge($params, [
            'abstract' => $this->getAbstractText($this, $params),
            'user_id' => $user ? $user->id : null,
            'contract_id' => $this->id
        ]);

        if ($params['status_code'] == 36 || $params['status_code'] == 39) 
        {
            $attributes = array_merge($attributes, [
                'waiting' => 1
            ]);           
        }        
        
        $activityCreated = Activity::create($attributes);
        
        if ($params['status_code'] == 36 || $params['status_code'] == 39) 
        {
            $chainDate = Carbon::createFromTimestamp($params['chain_updated_at']);

            $activityCreatedFirst = Activity::where(["status_code" => $params['status_code'], "chain_updated_at" => $chainDate, "contract_id" => $attributes['contract_id']])->first();

            
            if ($activityCreatedFirst->id == $activityCreated->id) 
            {
                $activityUpdated = $activityCreatedFirst->update(array('waiting' => 0));
                return $activityCreatedFirst;
            }
            else 
            {
                $activityCreated->delete();
            }
        }

        return null;
    }

    public function getSendTo($wallet)
    {
        $contractWallet = strtolower($this->part_a_wallet);
        $requestWallet = strtolower($wallet);

        if ($contractWallet == $requestWallet) {
            return $this->part_b_wallet;
        }
        return $this->part_a_wallet;
    }



    public function getCurrentActivity()
    {
        $this->load('activities');
        if ($this->activities->count() > 0) {
            $activity = $this->activities                
                ->sortByDesc('id')
                ->first();

            return $activity;
        }

        return null;
    }

    /**
     * Get the label from the status changed
     *
     * @return string
     */
    protected function getAbstractText(Contract $contract, array $params)
    {
        $labels = config('jur.activities.labels');
        $currentStatus = $contract->getCurrentStatus();

        $jurLabel = array_filter($labels, function($label) use($currentStatus) {
            return $label['status_code'] == $currentStatus->code;
        });

        $indexKey = array_keys($jurLabel);
        $currentLabel = array_pop($jurLabel);
        $labelText = $currentLabel['label_name'];

        if ($currentStatus->code == 1) {
            $labelText = __("messages.labels.{$indexKey[0]}.label_name", [
                'part' => $contract->part_b_name ? $contract->part_b_wallet : null
            ]);
        } elseif ($currentStatus->code == 2) {
            $labelText = __("messages.labels.{$indexKey[0]}.label_name", [
                'name' => $contract->name
            ]);
        } elseif ($currentStatus->code == 3 || $currentStatus->code == 5 ||$currentStatus->code == 10) {
            if ($params['interpolation']['value'] > 0) {
                $labelText = __("messages.labels.{$indexKey[0]}.label_name", [
                    'value' => $params['interpolation']['value']
                ]);
            } else {
                if (Lang::has("messages.labels.{$indexKey[0]}.label_name_empty")) {
                    $labelText = __("messages.labels.{$indexKey[0]}.label_name_empty", [
                        'value' => $params['interpolation']['contract_value']
                    ]);
                }
            }
        }
        $abstract = [$labelText, $currentLabel['label_status']];

        return implode(' ', $abstract);
    }
}
