<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OathKeeperController extends Controller
{
    /**
     * GET analytical details of all cards for a period.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getCards(Request $request)
    {
        return response()->json(['status' => 'success']);
    }

    /**
     * GET analytical details of a card based on card name for a period.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getCard(Request $request)
    {
        return response()->json(['status' => 'success']);
    }

}
