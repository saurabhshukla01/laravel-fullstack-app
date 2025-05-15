<?php

// use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Console\Scheduling\Schedule;

// please comment this code and add some code inside this console.php file inside routes
// Artisan::command('inspire', function () {
//     $this->comment(Inspiring::quote());
// })->purpose('Display an inspiring quote');

Artisan::command('schedule:run-custom', function () {
    $this->comment('Running scheduled tasks...');
})->purpose('Run custom scheduled tasks');

// app()->booted(function () {
//     $schedule = app(Schedule::class);

//     // This runs your custom command every minute
//     $schedule->command('log:create')->everyMinute();
// });


app()->booted(function () {
    $schedule = app(Schedule::class);

    // // Run every minute  ( runs your custom command every minute )
    // $schedule->command('log:create')->everyMinute();
    // // Run every 5 minutes
    // $schedule->command('task:five-min')->everyFiveMinutes();
    // // Run every 2 minutes
    // $schedule->command('task:two-min')->everyTwoMinutes();
    // // Run every hour
    // $schedule->command('task:hourly')->hourly();
    // // Run daily at 2 AM
    // $schedule->command('task:daily')->dailyAt('02:00');

    // Start random data cronJob in User create every 5 min , post create every 3 min & comment added in every min. 
    $schedule->command('user:create-random')->everyFiveMinutes();
    $schedule->command('post:create-random')->everyThreeMinutes();
    $schedule->command('comment:create-random')->everyMinute();

});