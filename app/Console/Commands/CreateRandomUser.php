<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class CreateRandomUser extends Command
{
    protected $signature = 'user:create-random';
    protected $description = 'Create a random user every 5 mins';

    public function handle()
    {
        $email = fake()->unique()->safeEmail;

        if (!User::where('email', $email)->exists()) {
            $user = User::factory()->create(['email' => $email]);
            $this->info("User created: {$user->email}");
        } else {
            $this->warn("User with email already exists.");
        }
    }
}
