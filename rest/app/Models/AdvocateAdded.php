<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdvocateAdded extends Model {
  public static function advocateAdded($payload) {
    $advocateAdded = AdvocateAdded::firstOrCreate(['sc_advocate_id' => $payload->id]);

    $advocateAdded->wallet = $payload->wallet;
    $advocateAdded->activation_time = $payload->activationTime;
    $advocateAdded->type = $payload->type;

    return $advocateAdded->save();
  }
}
