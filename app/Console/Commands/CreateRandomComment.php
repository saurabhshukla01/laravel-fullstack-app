<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;

class CreateRandomComment extends Command
{
    protected $signature = 'comment:create-random';
    protected $description = 'Create a comment every 1 min';

    public function handle()
    {
        $user = User::inRandomOrder()->first();
        $post = Post::inRandomOrder()->first();

        if ($user && $post) {
            Comment::factory()->create([
                'user_id' => $user->id,
                'post_id' => $post->id,
            ]);
            $this->info("Comment added to Post ID: {$post->id} by User ID: {$user->id}");
        } else {
            $this->warn("Missing post or user.");
        }
    }
}

