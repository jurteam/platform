<?php

namespace App\Console\Commands;

use Anik\Amqp\ConsumableMessage;
use Illuminate\Console\Command;
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
            echo $message->getStream() . PHP_EOL;
            $message->getDeliveryInfo()->acknowledge();
        }, 'routing-key', [

            'queue' => [
                'name' => 'OathTaken',
                'declare' => true,
                'exclusive' => false
            ]

        ]);

    }
}
