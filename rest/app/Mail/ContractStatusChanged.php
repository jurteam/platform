<?php

namespace App\Mail;

use App\Models\Activity;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContractStatusChanged extends Mailable
{
    use Queueable, SerializesModels;

    protected $activity;

    protected $attributes;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Activity $activity, array $attributes)
    {
        $this->activity = $activity;
        $this->attributes = $attributes;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $from = $this->getFromData();
        $contractUrl = config('jur.url') . "/contacts/detail/{$this->activity->contract_id}";

        return $this
                ->subject($this->activity->abstract)
                ->from($from['address'], $from['name'])
                ->markdown('vendor.contracts.changed', [
                    'contract' => $this->activity->contract,
                    'attributes' => $this->attributes,
                    'subject' => $this->activity->abstract,
                    'contractUrl' => $contractUrl
                ]);
    }

    protected function getFromData()
    {
        if (! empty($this->attributes['address'])) {
            return $this->attributes;
        }

        return config('jur.from');
    }
}
