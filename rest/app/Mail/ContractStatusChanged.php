<?php

namespace App\Mail;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContractStatusChanged extends Mailable
{
    use Queueable, SerializesModels;

    protected $contract;

    protected $attributes;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Contract $contract, array $attributes)
    {
        $this->contract = $contract;
        $this->attributes = $attributes;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = $this->getContractStatusSubject();
        $from = $this->getFromData();

        return $this
                ->subject($subject)
                ->from($from['address'], $from['name'])
                ->markdown('vendor.contracts.changed', [
                    'contract' => $this->contract,
                    'attributes' => $this->attributes,
                    'subject' => $subject
                ]);
    }

    /**
     * Get the label from the status changed
     *
     * @return string
     */
    protected function getContractStatusSubject()
    {
        $labels = config('jur.activities.labels');
        $contract = $this->contract;

        $label = array_filter($labels, function($label) use($contract) {
            return $label['status_code'] == $contract->status->code;
        });
        $currentLabel = array_pop($label);

        return $currentLabel['label_name'] . ' ' . $currentLabel['label_status'];
    }

    protected function getFromData()
    {
        if (! empty($this->attributes['address'])) {
            return $this->attributes;
        }

        return config('jur.from');
    }
}
