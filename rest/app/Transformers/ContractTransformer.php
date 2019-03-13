<?php

namespace App\Transformers;

use App\Models\Contract;
use League\Fractal\TransformerAbstract;
use App\Transformers\AttachmentTransformer;
use App\Transformers\ContractDetailTransformer;
use App\Transformers\ContractActivityTransformer;

class ContractTransformer extends TransformerAbstract
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
            'contractName' => $contract->name,
            'duration' => (object)[
                'days' => $contract->duration_days,
                'hours' => $contract->duration_hours,
                'minutes' => $contract->duration_minutes
            ],
            'expireDate' => null,
            'counterParties' => [
                (object)[
                    'wallet' => $contract->part_a_wallet,
                    'name' => $contract->part_a_name,
                    'renderName' => $contract->owner->show_fullname
                ],
                (object)[
                    'wallet' => $contract->part_b_wallet,
                    'name' => $contract->part_b_name,
                    'renderName' => false
                ]
            ],
            'value' => $contract->value,
            'whoPays' => $contract->who_pays
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
}
