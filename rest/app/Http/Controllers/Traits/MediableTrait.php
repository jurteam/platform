<?php

namespace App\Http\Controllers\Traits;

use App\Models\Contract;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\Models\Media;
use App\Transformers\AttachmentTransformer;

trait MediableTrait
{
    public function deleteMedia(Request $request, $id)
    {
        $media = Media::findOrFail($id);
        $media->delete();

        return response()->json(['status' => 'deleted']);
    }
}
