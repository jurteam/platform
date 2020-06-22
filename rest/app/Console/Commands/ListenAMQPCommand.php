<?php

namespace App\Console\Commands;

use Anik\Amqp\ConsumableMessage;
use Illuminate\Console\Command;
use \App\Models\OathKeeper;
use \App\Models\Status;
use \Illuminate\Support\Facades\App;

class ListenAMQPCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jur:listen-amqp';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Listen to AMQP events and process payload';

    /**
     * Create a new command instance.
     *~
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        app('amqp')->consume(function (ConsumableMessage $message) {

            $success = false;

            // Decode json string to object
            $payload = json_decode($message->getStream());

            switch ($payload->assetIdentifier) {
                case 'oathKeeper':
                    $success = OathKeeper::consumeAMQP($payload);
                    break;

                case 'status':
                    $success = Status::consumeAMQP($payload);
                    break;
            }

            if ($success) {
                // Acknowledge AMQP if message processed successfully
                $message->getDeliveryInfo()->acknowledge();
            }

            // Log info
            info($payload->assetIdentifier . ' : "' . $payload->eventIdentifier . '" processed successfully!');

        }, 'routing-key', ['queue' => ['name' => 'blockchain-events']]);
    }
}
