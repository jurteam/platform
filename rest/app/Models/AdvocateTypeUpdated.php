<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdvocateTypeUpdated extends Model {
  public function advocateTypeUpdated($payload) {
    $advocateTypeUpdated = AdvocateTypeUpdated::firstOrCreate(['sc_advocate_id' => $payload->id]);
    $advocateTypeUpdated->wallet = $payload->wallet;
    $advocateTypeUpdated->type = $payload->type;

    return $advocateTypeUpdated->save();
  }
}
