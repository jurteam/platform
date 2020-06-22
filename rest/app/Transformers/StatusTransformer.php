<?php

namespace App\Transformers;

use App\Models\Status;
use League\Fractal\TransformerAbstract;

class StatusTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \App\Models\Status $status
     * @return array
     */
    public function transform(Status $status)
    {
        return [
            'id' => $status->wallet,
            'type' => "holders",
            'attributes' =>
            [
                'address' => $status->wallet,
                'statusType' => $status->status_type
            ]
        ];
    }

}
