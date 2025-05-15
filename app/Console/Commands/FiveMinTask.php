<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class FiveMinTask extends Command
{
    protected $signature = 'task:five-min';
    protected $description = 'Runs every 5 minutes';

    public function handle(): void
    {
        \Log::info('FiveMinTask ran at ' . now());
    }
}
