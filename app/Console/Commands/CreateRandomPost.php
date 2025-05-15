<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Post;
use App\Models\User;

class CreateRandomPost extends Command
{
    protected $signature = 'post:create-random';
    protected $description = 'Create a random post every 3 mins';

    public function handle()
    {
        $user = User::inRandomOrder()->first();
        if ($user) {
            $post = Post::factory()->create(['user_id' => $user->id]);
            $this->info("Post created: {$post->title}");
        } else {
            $this->warn("No user found to assign post.");
        }
    }
}
