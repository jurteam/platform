<?php

namespace App\Transformers;

use App\Models\User;
use App\Models\Contract;
use League\Fractal\TransformerAbstract;
use App\Transformers\AttachmentTransformer;
use App\Transformers\ContractDetailTransformer;
use App\Transformers\ContractActivityTransformer;
// use ElfSundae\Laravel\Hashid\Facades\Hashid;

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
        $currentStatus = $contract->getCurrentStatus();

        // try {

            $enc1 = hashid_encode(5664);

            // $enc2 = hashid()->encode(5664);

            // $enc3 = Hashid::encode(5664);
        // }
        // catch (Exception $e) {
        //     return 'Caught exception: '.  $e->getMessage(). "\n";
        // }

        return [
            'id' => $contract->id,
            // 'idh' => hashid_encode(5664),
            'statusId' => $currentStatus ? $currentStatus->code : null,
            'statusLabel' => $currentStatus ? $currentStatus->label : null,
            'statusUpdatedAt' => $contract->getCurrentStatusUpdatedAt(),
            'statusFrom' => $contract->getLastStatusFrom(),
            'statusPart' => $contract->getLastStatusPart(),
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
            'whoPays' => $contract->who_pays,
            'hasPenaltyFee' => $contract->has_penalty_fee,
            'partAPenaltyFee' => $contract->part_a_penalty_fee,
            'partBPenaltyFee' => $contract->part_b_penalty_fee
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
