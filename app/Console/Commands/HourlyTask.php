<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class HourlyTask extends Command
{
    protected $signature = 'task:hourly';
    protected $description = 'Runs every 1 hour';
    public function handle(): void
    {
        \Log::info('HourTask ran at ' . now());
    }
}
