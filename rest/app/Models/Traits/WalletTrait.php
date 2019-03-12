<?php

namespace App\Models\Traits;

trait WalletTrait
{
    /**
     * Default query to find an user by wallet code.
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param  string $wallet
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByWallet($query, $wallet)
    {
        return $query->whereWallet($wallet);
    }

    /**
     * Create a new user.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \App\Models\User
     */
    public static function createByWallet($request)
    {
        $attributes = array_merge($request->all(), [
            'wallet' => $request->header('wallet')
        ]);

        return static::create($attributes);
    }

    /**
     * Update user info.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \App\Models\User
     */
    public static function updateByWallet($request)
    {
        $user = static::byWallet($request->header('wallet'))->firstOrFail();
        $user->update($request->all());

        return $user;
    }

    public static function deleteByWallet($request)
    {
        $user = static::byWallet($request->header('wallet'))->firstOrFail();
        return $user->delete();
    }
}
