<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Log;

class Status extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'wallet'
    ];

    public $timestamps = true;

    public function scopeFilters($query, $filters)
    {
        return $filters->apply($query);
    }

    /**
     * Consume AMQP
     *
     * @param Object $payload: payload data send by AMQP server
     * @return Boolean the success or failure message
     */
    public static function consumeAMQP($payload)
    {
        $saved = false;

        switch ($payload->eventIdentifier) {

            // StatusAdded event
            case 'StatusAdded':
                $saved = Status::store($payload->data);
                break;

            // StateChanged event
            case 'StateChanged':
                $saved = Status::updateState($payload->data);
                break;
        }

        // Return process status
        return $saved;
    }

    /**
     * Store status
     *
     * @param Object $data: payload data send by AMQP server
     * @return Boolean the success or failure message
     */
    public static function store($data)
    {
        $exists = Status::where(['wallet' => $data->statusHolder])->first();

        info($exists);
        if (isset($exists)) {
            Log::warning('The Status of holder with wallet `' . $data->statusHolder . '` already exists in the database.');
            return false;
        }

        $user = User::firstOrCreate(['wallet' => $data->statusHolder]);

        $status = new Status;
        $status->user_id = $user->id;
        $status->wallet = $data->statusHolder;
        $status->activated_at = Carbon::createFromTimestamp($data->activationTime);
        $status->is_active = true;
        $status->status_type = $data->statusType;

        return $status->save();
    }

    /**
     * Update state of a Status
     *
     * @param Object $data: payload data send by AMQP server
     * @return Boolean the success or failure message
     */
    public static function updateState($data)
    {
        $status = Status::where(['wallet' => $data->statusHolder])->first();

        if (!isset($status)) {
            Log::warning('The Status of holder with wallet `' . $data->statusHolder . '` not exists in the database.');
            return false;
        }

        $status->is_active = $data->newState;

        return $status->save();
    }
}
