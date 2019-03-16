<?php

namespace App\Transformers;

use App\Models\User;
use App\Models\Contract;
use League\Fractal\TransformerAbstract;
use App\Transformers\AttachmentTransformer;
use App\Transformers\ContractDetailTransformer;

class ContractDetailTransformer extends TransformerAbstract
{
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'attachments', 'details'
    ];

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
            'statusUpdatedAt' => $contract->status ? $contract->updated_at->valueOf() : null,
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
                    'renderName' => $contract->owner->show_fullname
                ],
                (object)[
                    'wallet' => $contract->part_b_wallet,
                    'name' => $contract->part_b_name,
                    'renderName' => $this->getRenderNameUserFromWallet($contract->part_b_wallet)
                ]
            ],
            'value' => $contract->value,
            'whoPays' => $contract->who_pays,
            'txHash' => $contract->tx_hash,
            'kpi' => $contract->kpi,
            'resolutionProof' => $contract->resolution_proof,
            'category' => $contract->category,
            'inCaseOfDispute' => $contract->in_case_of_dispute,
            'hasPenaltyFee' => $contract->has_penalty_fee,
            'partAPenaltyFee' => $contract->part_a_penalty_fee,
            'partBPenaltyFee' => $contract->part_b_penalty_fee,
            'isDispute' => $contract->is_a_dispute,
            'isFriendlyResolution' => $contract->is_a_friendly_resolution
        ];
    }

    /**
     * Include attachments
     *
     * @param  \App\Models\Contract $contract
     * @return \League\Fractal\Resource\Collection
     */
    public function includeAttachments(Contract $contract)
    {
        $attachments = $contract->getMedia();

        return $this->collection($attachments, new AttachmentTransformer);
    }

    /**
     * Include details
     *
     * @param  \App\Models\Contract $contract
     * @return \League\Fractal\Resource\Collection
     */
    public function includeDetails(Contract $contract)
    {
        $details = $contract->details;

        return $this->collection($details, new ContractDetailTransformer);
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
