<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DailyTask extends Command
{
    protected $signature = 'task:daily';
    protected $description = 'Runs every day';

    public function handle(): void
    {
        \Log::info('DailyTask ran at ' . now());
    }
}
