<?php

namespace App\Http\Controllers;
use Dingo\Api\Routing\Helpers;
class PastEventController extends Controller
{
    use Helpers;

    /**
     * Host of PER service.
     */
    private $host;

    /**
     * Instantiate a new PastEventController instance.
     */
    public function __construct()
    {
        // get host info from config
        $this->host = config('polling.PERHost');
    }

}
