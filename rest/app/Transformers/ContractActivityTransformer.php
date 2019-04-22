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
            'id' => $activity->id,
            'readed' => $activity->readed,
            'date' => $activity->created_at->valueOf(),
            'contract_name' => $activity->contract->name,
            'contract' => $activity->contract_id,
            'part_a' => $activity->contract->part_a_wallet,
            'part_b' => $activity->contract->part_b_wallet,
            'from' => (object)[
                'wallet' => $activity->user->wallet,
                'name' => $activity->user->name,
                'system' => $this->getSystem($activity)
            ],
            'abstract' => null, # to-do
            'to' => $activity->to_wallet,
            'status' => $activity->status_code,
            'message' => $activity->message,
            'proposal' => (object)[
                'part_a' => $activity->proposal_part_a,
                'part_b' => $activity->proposal_part_b
            ]
        ];
    }

    /**
     * Include attachments
     *
     * @param  \App\Models\Activity $activity
     * @return \League\Fractal\Resource\Collection
     */
    public function includeAttachments(Activity $activity)
    {
        $attachments = $activity->getMedia('attachments');

        return $this->collection($attachments, new AttachmentTransformer);
    }

    /**
     * Check if the activities has been generated by the system.
     *
     * @param  \App\Models\Activity $activity
     * @return boolean
     */
    protected function getSystem(Activity $activity)
    {
        if (in_array($activity->status_code, [39,8])) {
            return true;
        }
        return false;
    }
}
