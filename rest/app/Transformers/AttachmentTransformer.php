<?php

namespace App\Transformers;

use Spatie\MediaLibrary\Models\Media;
use League\Fractal\TransformerAbstract;

class AttachmentTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @param  \Spatie\MediaLibrary\Models\Media $contract
     * @return array
     */
    public function transform(Media $media)
    {
        return [
            'id' => $media->id,
            'fileName' => $media->file_name,
            'url' => $media->getFullUrl()
        ];
    }
}
