<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Laravel\Lumen\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \Laravelista\LumenVendorPublish\VendorPublishCommand::class,
        \App\Console\Commands\StorageLinkCommand::class,
        \App\Console\Commands\Notifications\NotificationMakeCommand::class,
        \App\Console\Commands\Mails\MailMakeCommand::class,
        \App\Console\Commands\ResetDisputeStatusCommand::class,
        \App\Console\Commands\NotifyPartiesForContractDeadline::class,
        \App\Console\Commands\NotifyPartiesForContractExpired::class,
        \App\Console\Commands\NotifyUsersVotingSessionCommand::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Check for ongoing contract near to reach their deadline date
        $schedule->command('jur:contract-deadline')->daily();

        // Check for ongoing contract thas has reached their deadline date
        $schedule->command('jur:contract-expired')->daily();

        // Check for open voting session for dispute contracts
        $schedule->command('jur:dispute-voting-session')->daily();
    }
}
