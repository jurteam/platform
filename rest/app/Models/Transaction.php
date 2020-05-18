<?php

namespace App\Models;

use App\Models\Traits\WalletTrait;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{

  use WalletTrait;

  protected $fillable = [
    'txid',
    'event',
    'wallet',
    'param',
    'locked_by',
    'block',
    'time',
    'contract_id',
    'vote_id'
  ];


  public function scopeNotResolved($query)
  {
      return $query->whereNull('block');
  }

  public function scopeMine($query, $wallet)
  {
    $lowerWallet = strtolower($wallet);

    return $query
    ->select('transactions.*')
    ->join('contracts', 'contract_id', '=', 'contracts.id')
    ->where('event', '=', 'VoteCast')
    ->orWhere('transactions.wallet', '=', $lowerWallet)
    ->orWhere(function($query) use($lowerWallet)
    {
        $query
        ->where('part_a_wallet','=',$lowerWallet)
        ->orWhere('part_b_wallet','=',$lowerWallet);
    });
    
  }

  public function scopeLockedByMeOrUnlocked($query, $wallet)
  {
      $lowerWallet = strtolower($wallet);

      return $query->whereRaw('LOWER(locked_by) = ?', [$lowerWallet])->orWhereNull('locked_by');
  }

  public function scopeLockedByMe($query, $wallet)
  {
      $lowerWallet = strtolower($wallet);

      return $query->whereRaw('LOWER(locked_by) = ?', [$lowerWallet]);
  }

  public function scopeUnlocked($query)
  {

      return $query->whereNull('locked_by');
  }

  public function contract()
  {
      return $this->belongsTo(Contract::class);
  }

  /**
   * Store a new transaction.
   *
   * @param  \Illuminate\Http\Request $params
   */
  public static function storeTransaction($params)
  {
      $transaction = static::create(array_merge(
          $params->all(), [
              'wallet' => $params->header('wallet'),
              'contract_id' => decodeId($params->contract_id)
          ]
      ));

      return $transaction;
  }

}