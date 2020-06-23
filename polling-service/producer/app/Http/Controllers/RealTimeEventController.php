<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Transformers\AssetTransformer;
use Dingo\Api\Http\Response;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class RealTimeEventController extends Controller
{
    use Helpers;

    /**
     * GET configurations for polling service
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $assets = Asset::all();

        if (sizeof($assets) == 0) {
            abort(404, 'No configuration found for RTR!');
        }

        $transformer = new AssetTransformer;

        return [
            'nextBlockNumber' => Asset::findNextBlock(0),
            'contracts' => $assets->map(function ($asset) use ($transformer) {
                return $transformer->transform($asset);
            })
        ];
    }
}
