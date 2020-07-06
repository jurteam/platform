<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\CustomPaginationTrait;
use App\Transformers\AdvocateTransformer;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use \App\Models\Advocate;

class AdvocateController extends Controller
{
    use Helpers, CustomPaginationTrait;

    /**
     * GET all advocates
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $advocates = Advocate::get();

        return $this->response->paginator(
            $this->customPagination($advocates, $request),
            new AdvocateTransformer
        );
    }
}
