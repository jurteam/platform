<?php

namespace App\Transformers;

use App\Models\User;
use App\Models\Contract;
use League\Fractal\TransformerAbstract;
use App\Transformers\AttachmentTransformer;
use App\Transformers\ContractStatusDetailTransformer;

class DisputeDetailTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\Contract $contract
     * @return array
     */
    public function transform(Contract $contract)
    {
        $totalTokensPartA = $contract->getTokensPart('part_a_wallet');
        $totalTokensPartB = $contract->getTokensPart('part_b_wallet');

        return [
            'id' => $contract->id,
            'statusId' => $contract->status ? $contract->status->code : null,
            'statusLabel' => $contract->status ? $contract->status->label : null,
            'statusUpdatedAt' => $contract->getCurrentStatusUpdatedAt(),
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
                    'email' => $contract->part_a_email,
                    'renderName' => $this->getRenderNameUserFromWallet($contract->part_a_wallet)
                ],
                (object)[
                    'wallet' => $contract->part_b_wallet,
                    'name' => $contract->part_b_name,
                    'email' => $contract->part_b_email,
                    'renderName' => $this->getRenderNameUserFromWallet($contract->part_b_wallet)
                ]
            ],
            'value' => $contract->value,
            'whoPays' => $contract->who_pays,
            'address' => $contract->address,
            'kpi' => $contract->kpi,
            'resolutionProof' => $contract->resolution_proof,
            'category' => $contract->category,
            'inCaseOfDispute' => $contract->in_case_of_dispute,
            'hasPenaltyFee' => $contract->has_penalty_fee,
            'partAPenaltyFee' => $contract->part_a_penalty_fee,
            'partBPenaltyFee' => $contract->part_b_penalty_fee,
            'isDispute' => $contract->is_a_dispute,
            'isFriendlyResolution' => $contract->is_a_friendly_resolution,
            'lastPartInvolved' => $contract->getLastPart(),
            'proposalPartA' => (object) $contract->getProposalPart('part_a'),
            'proposalPartB' => (object) $contract->getProposalPart('part_b'),
            'earnings' => $contract->getEarnings(),
            'totalTokensPartA' => $totalTokensPartA,
            'totalTokensPartB' => $totalTokensPartB,
            'totalTokens' => $totalTokensPartA + $totalTokensPartB,
            'percentagePartA' => $contract->getPercetangePart('part_a_wallet'),
            'percentagePartB' => $contract->getPercetangePart('part_a_wallet')
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
