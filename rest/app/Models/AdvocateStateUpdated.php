<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdvocateStateUpdated extends Model {
  public static function advocateStateUpdated($payload) {
    $advocateStateUpdated = AdvocateStateUpdated::firstOrCreate(['sc_advocate_id' => $payload->id]);

    $advocateStateUpdated->wallet = $payload->wallet;
    $advocateStateUpdated->is_active = $payload->is_active;

    return $advocateStateUpdated->save();
  }
}
