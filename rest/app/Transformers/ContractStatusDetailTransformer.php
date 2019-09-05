<?php

namespace App\Transformers;

use App\Models\ContractStatusDetail;
use League\Fractal\TransformerAbstract;
use App\Transformers\AttachmentTransformer;

class ContractStatusDetailTransformer extends TransformerAbstract
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
     * @param  \App\Models\ContractStatusDetail $contract
     * @return array
     */
    public function transform(ContractStatusDetail $detail)
    {
        $contract = $detail->contract;

        return [
            'id' => $detail->id,
            'date' => $detail->created_at->valueOf(),
            'contract' => $detail->contract_id,
            'statusId' => $contract->status ? $contract->status->code : null,
            'statusFrom' => $contract->getLastStatusFrom(),
            'from' => (object) [
                'wallet' => $detail->contract_part,
                'name' => $detail->user ? $detail->user->name : null,
                'system' => $this->getSystem($detail)
            ],
            'message' => $detail->message,
            'proposal' => (object) [
                'proposal_part_a' => $detail->proposal_part_a,
                'proposal_part_b' => $detail->proposal_part_b
            ],
            'payed_at' => $detail->payed_at ? $detail->payed_at->valueOf() : null
        ];
    }

    /**
     * Include attachments
     *
     * @param  \App\Models\ContractStatusDetail $contract
     * @return \League\Fractal\Resource\Collection
     */
    public function includeAttachments(ContractStatusDetail $detail)
    {
        $attachments = $detail->getMedia('attachments');

        return $this->collection($attachments, new AttachmentTransformer);
    }

    /**
     * Check if the activities has been generated by the system.
     *
     * @return boolean
     */
    protected function getSystem(ContractStatusDetail $detail)
    {
        $status = $detail->contract->status;
        if (in_array($status->code, [8,39,38,36])) {
            return true;
        }
        return false;
    }
}
