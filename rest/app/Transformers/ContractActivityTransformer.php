<?php

namespace App\Transformers;

use App\Models\Activity;
use League\Fractal\TransformerAbstract;
use App\Transformers\AttachmentTransformer;

class ContractActivityTransformer extends TransformerAbstract
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
    public function transform(Activity $activity)
    {
        return [
            'readed' => $activity->readed,
            'date' => $activity->created_at->valueOf(),
            'contract' => $activity->contract_id,
            'part_a' => $activity->contract->part_a_wallet,
            'part_b' => $activity->contract->part_b_wallet,
            'from' => (object)[
                'wallet' => $activity->user->wallet,
                'name' => $activity->user->name,
                'system' => $activity->user->show_fullname
            ],
            'abstract' => $activity->abstract,
            'to' => $activity->to_wallet,
            'status' => $activity->status,
            'message' => $activity->message,
            'proposal' => (object)[
                'part_a': $activity->proposal_part_a,
                'part_b': $activity->proposal_part_b
            ]
        ];
    }

    /**
     * Include attachments
     *
     * @return \League\Fractal\Resource\Collection
     */
    public function includeAttachments(Activity $activity)
    {
        $attachments = $activity->getMedia();

        return $this->collection($attachments, new AttachmentTransformer);
    }
}
