<?php

namespace App\Transformers;

use App\Models\ContractStatusDetail;
use League\Fractal\TransformerAbstract;
use App\Transformers\AttachmentTransformer;

class ContractDetailTransformer extends TransformerAbstract
{
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'evidences'
    ];

    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\ContractStatusDetail $contract
     * @return array
     */
    public function transform(ContractStatusDetail $detail)
    {
        return [
            'date' => $detail->created_at->valueOf(),
            'contract' => $detail->contract_id,
            'from' => (object)[
                'wallet' => $detail->user->wallet,
                'name' => $detail->user->name,
                'system' => $detail->user->show_fullname
            ],
            'message' => $detail->message,
            'proposal' => (object)[
                'proposal_part_a': $detail->proposal_part_a,
                'proposal_part_b': $detail->proposal_part_b
            ],
            'payed_at' => $detail->payed_at->valueOf()
        ];
    }

    /**
     * Include attachments
     *
     * @param  \App\Models\ContractStatusDetail $contract
     * @return \League\Fractal\Resource\Collection
     */
    public function includeEvidencess(ContractStatusDetail $detail)
    {
        $evidences = $detail->getMedia();

        return $this->collection($evidences, new AttachmentTransformer);
    }
}
