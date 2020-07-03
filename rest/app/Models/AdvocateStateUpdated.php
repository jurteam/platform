<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdvocateStateUpdated extends Model {
  public static function advocateStateUpdated($payload) {
    $advocateStateUpdated = AdvocateStateUpdated::firstOrCreate(['sc_advocate_id' => $payload->id]);

    $advocateStateUpdated->wallet = $payload->wallet;
    $advocateStateUpdated->newState = $payload->newState;

    return $advocateStateUpdated->save();
  }
}
