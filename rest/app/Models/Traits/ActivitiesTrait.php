<?php

namespace App\Models\Traits;

use App\Models\Activity;

trait ActivitiesTrait
{
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function recordActivities($params, $user)
    {
        $attributes = array_merge($params, [
            'user_id' => $user->id
        ]);
        $activity = new Activity($attributes);
        $this->activities()->save($activity);

        return $activity;
    }
}
