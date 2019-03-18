<?php

namespace App\Models\Traits;

trait UploadableTrait
{
    public function uploadMedia($params, $collection = 'attachments')
    {
        foreach ($params->attachments as $attachment) {
            $this->addMedia($attachment)
                ->toMediaCollection($collection);
        }
    }
}
