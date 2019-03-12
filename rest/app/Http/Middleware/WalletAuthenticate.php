<?php

namespace App\Http\Middleware;

use Closure;

class WalletAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->headers->has('wallet')) {
            return response('Unauthorized', 401);
        }

        return $next($request);
    }
}
