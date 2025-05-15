<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CreateLogFile extends Command
{
    protected $signature = 'log:create';
    protected $description = 'Create a log file every minute in a date-based folder';

    public function handle(): void
    {
        $date = now()->format('Y-m-d'); // Folder: logs/2025-05-15/
        $time = now()->format('H-i-s'); // Filename: log_12-01-33.txt
        $path = "logs/{$date}/log_{$time}.txt";

        $content = "Log created at: " . now()->toDateTimeString();

        Storage::disk('local')->put($path, $content);

        $this->info("Log file created at: storage/app/{$path}");
    }
}
