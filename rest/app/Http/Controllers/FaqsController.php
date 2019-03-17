<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\Request;

class FaqsController extends Controller
{
    /**
     * Return the list of faqs.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $faqs = Faq::all();

        return response()->json(compact('faqs'));
    }
}
