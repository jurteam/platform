<?php

namespace App\Console\Commands;

use App\Jobs\PublishTransaction;
use Carbon\Carbon;
use Illuminate\Console\Command;
use \App\Models\UndeliveredMessage;
use \Illuminate\Support\Facades\App;

class FailedPollingCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jur:failed-polling';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Try to post undelivered transactions to the consumers';

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
        $messages = UndeliveredMessage::where('next_try_at', '<=', Carbon::now())->where('status', 'active')->get();

        foreach ($messages as $message) {
            dispatch(new PublishTransaction($message->consumer, $message->transaction));
        }
    }
}
