<?php

namespace App\Transformers;

use App\Models\ContractVote;
use League\Fractal\TransformerAbstract;
use App\Transformers\AttachmentTransformer;

class ContractVoteTransformer extends TransformerAbstract
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
     * @param  \App\Models\ContractVote $vote
     * @return array
     */
    public function transform(ContractVote $vote)
    {
        return [
            'id' => $vote->id,
            'amount' => $vote->amount,
            'message' => $vote->message,
            'oracle_wallet' => $vote->oracle_wallet,
            'wallet_part' => $vote->wallet_part,
            'its_me' => $vote->itsMe()
        ];
    }

    /**
     * Include attachments
     *
     * @return \League\Fractal\Resource\Collection
     */
    public function includeAttachments(ContractVote $vote)
    {
        $attachments = $vote->getMedia('attachments');

        return $this->collection($attachments, new AttachmentTransformer);
    }
}
