<?php

namespace App\Transformers;

use App\Models\ContractVote;
use League\Fractal\TransformerAbstract;

class ContractVoteTransformer extends TransformerAbstract
{
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
}
