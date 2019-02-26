<?php

namespace App\Transformers;

use App\Models\Activity;
use League\Fractal\TransformerAbstract;

class ContractActivityTransformer extends TransformerAbstract
{
    public function transform(Activity $activity)
    {
        return [
            'id' => $activity->id,
            'type' => $activity->type,
            'value' => $activity->value,
            'recorded_at' => $activity->updated_at
        ];
    }
}
