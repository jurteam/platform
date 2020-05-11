<?php

namespace App\Console\Commands;

use Anik\Amqp\ConsumableMessage;
use App\Jobs\GenerateOathKeeperRank;
use Illuminate\Console\Command;
use \App\Models\Oath;
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

            // Decode json string to object
            $data = json_decode($message->getStream());

            // Process decoded message
            $oath = Oath::process($data);

            if ($oath) {

                // Dispatch queue to generate rank
                dispatch(new GenerateOathKeeperRank);

                // Acknowledge AMQP if message processed successfully
                $message->getDeliveryInfo()->acknowledge();
            }

            // Log info
            info($data->assetIdentifier . ' : "' . $data->eventIdentifier . '" processed successfully!');

        }, 'routing-key', [

            'queue' => [
                'name' => 'OathTaken',
                'declare' => true,
                'exclusive' => false
            ]

        ]);

    }
}
