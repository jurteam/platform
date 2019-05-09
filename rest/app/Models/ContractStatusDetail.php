<?php

namespace App\Models;

use App\Models\Traits\UploadableTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class ContractStatusDetail extends Model implements HasMedia
{
    use HasMediaTrait, UploadableTrait;

    protected $fillable = [
        'message',
        'contract_part',
        'proposal_part_a',
        'proposal_part_b',
        'payed_at',
        'user_id'
    ];

    /**
     * @var array
     */
    protected $dates = [
        'payed_at'
    ];

    /**
     * Save the contract status detail.
     *
     * @param  \Illuminate\Http\Request $params
     * @param  \App\Models\Contract $contract
     * @return \App\Models\Contract
     */
    public static function storeDetail($params, Contract $contract)
    {
        $user = User::byWallet($params->header('wallet'))->first();

        $contract->updateStatusByCode($params);
        $attributes = array_merge($params->all(), [
            'contract_part' => $params->header('wallet')
        ]);

        $detail = new self($attributes);
        $detail->contract()->associate($contract);
        $detail->user()->associate($user);
        $detail->save();

        return $detail;
    }

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getFromWallet($wallet)
    {
        return strcmp($this->contract_part, $wallet) == 0;
    }

    public function getAttachments()
    {
        $evidences = [];
        foreach ($this->getMedia('attachments') as $attachment) {
            $attachments[] = [
                'id' => $attachment->id,
                'fileName' => $attachment->file_name,
                'url' => $attachment->getFullUrl()
            ];
        }
        return $attachments;
    }
}
