<?php

namespace App\Models\Traits;


trait TransactionsTrait
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
        $lowerWallet = strtolower($wallet);

        return $query->whereRaw('LOWER(wallet) = ?', [$lowerWallet]);
    }
}