<?php

namespace App\Jobs;

use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use \App\Models\Consumer;
use \App\Models\Transaction;
use \App\Models\UndeliveredMessage;
use \App\Transformers\TransactionTransformer;

class PublishTransaction extends Job
{
    private $consumer;

    private $transaction;

    /**
     * Create a new job instance.
     *
     * @param  Consumer $consumer  Consumer object
     * @param  Transaction $transaction  transaction object
     * @return void
     */
    public function __construct(Consumer $consumer, Transaction $transaction)
    {
        $this->consumer = $consumer;

        $this->transaction = $transaction;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {

            // send a POST request with transaction data
            $response = Http::post($this->consumer->url, (new TransactionTransformer)->transform($this->transaction))->throw();

        } catch (\Throwable $ex) {
            $this->handleError($ex);
        }
    }

    /**
     * Handle Error
     *
     * @return void
     */
    private function handleError($ex)
    {
        $msg = UndeliveredMessage::firstOrCreate(['transaction_id' => $this->transaction->id]);

        $msg->transaction_id = $this->transaction->id;
        $msg->consumer_id = $this->consumer->id;
        $msg->error_code = $ex->getCode();
        $msg->error_message = $ex->getMessage();
        $msg->retries = isset($msg->retries) ? $msg->retries + 1 : 0;
        $msg->next_try_at = Carbon::now()->addMinutes($this->getFib($msg->retries));
        $msg->status = $msg->retries > config('polling.MaxRetry') ? 'active' : 'failed';
        $msg->save();
    }

    /**
     * get Fibonacci number on a posistion
     *
     * @param Number $n: index of the sequence
     * @return void
     */
    private function getFib($n)
    {
        return round(pow((sqrt(5) + 1) / 2, $n) / sqrt(5));
    }
}
