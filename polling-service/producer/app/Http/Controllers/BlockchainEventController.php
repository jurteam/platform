<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Transformers\BlockchainEventTransformer;
use Dingo\Api\Routing\Helpers;

class BlockchainEventController extends Controller
{
    use Helpers;

    /**
     * GET configurations for polling service
     *
     * @return \Illuminate\Http\Response
     */
    public function index($serviceName)
    {
        $assets = Asset::all();

        return $this->collection($assets, new BlockchainEventTransformer($serviceName));
    }
}
