<?php

namespace App\Transformers;

use App\Models\User;
use App\Models\Contract;
use League\Fractal\TransformerAbstract;
use App\Transformers\AttachmentTransformer;
use App\Transformers\ContractDetailTransformer;
use App\Transformers\ContractActivityTransformer;

class ContractTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\Contract $contract
     * @return array
     */
    public function transform(Contract $contract)
    {
        return [
            'id' => $contract->id,
            'statusId' => $contract->status ? $contract->status->code : null,
            'statusLabel' => $contract->status ? $contract->status->label : null,
            'statusUpdatedAt' => $contract->updated_at->valueOf(),
            'contractName' => $contract->name,
            'duration' => (object)[
                'days' => $contract->duration_days,
                'hours' => $contract->duration_hours,
                'minutes' => $contract->duration_minutes
            ],
            'expireAlertFrom' => $contract->updated_at->valueOf(),
            'counterparties' => [
                (object)[
                    'wallet' => $contract->part_a_wallet,
                    'name' => $contract->part_a_name,
                    'renderName' => $this->getRenderNameUserFromWallet($contract->part_a_wallet)
                ],
                (object)[
                    'wallet' => $contract->part_b_wallet,
                    'name' => $contract->part_b_name,
                    'renderName' => $this->getRenderNameUserFromWallet($contract->part_b_wallet)
                ]
            ],
            'value' => $contract->value,
            'whoPays' => $contract->who_pays
        ];
    }

    /**
     * Check the user render full name option.
     *
     * @param  string $wallet
     * @return boolean
     */
    protected function getRenderNameUserFromWallet($wallet)
    {
        $user = User::byWallet($wallet)->first();
        if ($user) {
            return $user->show_fullname;
        }
        return false;
    }
}
