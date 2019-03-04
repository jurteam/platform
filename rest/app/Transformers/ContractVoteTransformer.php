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
            'token' => $vote->jur_token,
            'description' => $vote->description,
            'oracle_wallet' => $vote->oracle_wallet,
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
        $attachments = $vote->getMedia();

        return $this->collection($attachments, new AttachmentTransformer);
    }
}
