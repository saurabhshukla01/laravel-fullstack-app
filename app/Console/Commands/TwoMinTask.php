<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TwoMinTask extends Command
{
    protected $signature = 'task:two-min';
    protected $description = 'Runs every 2 minutes';

    public function handle(): void
    {
        \Log::info('TwoMinTask ran at ' . now());
    }
}
