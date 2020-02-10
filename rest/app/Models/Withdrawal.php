<?php

namespace App\Models;

use App\Models\User;
use App\Mail\Disputes\Payout;
use App\Mail\Disputes\Withdraw;
use Illuminate\Support\Facades\Mail;
use Illuminate\Database\Eloquent\Model;

class Withdrawal extends Model
{
    protected $fillable = [
        'contract_id',
        'wallet',
        'amount',
        'type'
    ];

    public static function createWithdraw($params)
    {
        $withdraw = static::create(array_merge($params->toArray(), [
            'wallet' => $params->header('wallet')
        ]));

        $user = $this->getUserFromWallet();
        if ($user->email) {
            if ($withdraw->isWithdraw()) {
                Mail::to($user->email)
                    ->send(new Withdraw($withdraw));
            } else {
                Mail::to($user->email)
                    ->send(new Payout($withdraw));
            }
        }
    }

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    public function getUserFromWallet()
    {
        return User::byWallet($this->wallet)->first();
    }
}
