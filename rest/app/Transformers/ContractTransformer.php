<?php

namespace App\Transformers;

use App\Models\Contract;
use League\Fractal\TransformerAbstract;
use App\Transformers\AttachmentTransformer;
use App\Transformers\ContractActivityTransformer;

class ContractTransformer extends TransformerAbstract
{
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'attachments'
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
            'statusId' => $contract->status->code,
            'statusLabel' => $contract->status->label,
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
            'whoPays' => $contract->who_pays,
            'statusActivity' => $contract->statusActivity()
        ];
    }

    /**
     * Include attachments
     *
     * @return \League\Fractal\Resource\Collection
     */
    public function includeAttachments(Contract $contract)
    {
        $attachments = $contract->getMedia();

        return $this->collection($attachments, new AttachmentTransformer);
    }
}
