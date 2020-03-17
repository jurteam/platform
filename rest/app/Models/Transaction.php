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
    'block',
    'time',
  ];


  public function scopeNotResolved($query)
  {
      return $query->whereNull('block');
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
              'wallet' => $params->header('wallet')
          ]
      ));

      return $transaction;
  }

}