<?php

namespace App\Models\Traits;

use App\Models\Activity;

trait ActivitiesTrait
{
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function recordActivities($type, $value, $user)
    {
        $this->activities()->save(
            new Activity([
                'type' => $type,
                'value' => $value
                'user_id' => $user->id
            ])
        );
    }
}
