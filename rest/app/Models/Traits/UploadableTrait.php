<?php

namespace App\Models\Traits;

trait UploadableTrait
{
    public static function boot()
    {
        parent::boot();

        static::deleting(function($model) {
            $model->clearMediaCollection('evidences');
            $model->clearMediaCollection('attachments');
        });
    }

    public function uploadMedia($params, $collection = 'attachments')
    {
        foreach ($params->attachments as $attachment) {
            $this->addMedia($attachment)
                ->toMediaCollection($collection);
        }
    }
}
