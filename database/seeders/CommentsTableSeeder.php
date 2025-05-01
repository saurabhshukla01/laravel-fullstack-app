<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('comments')->insert([
            ['post_id' => 1, 'user_id' => 2, 'comment' => 'Great tips! Helped me a lot.', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 1, 'user_id' => 3, 'comment' => 'Thanks for sharing.', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 2, 'user_id' => 4, 'comment' => 'Loved the outfit ideas!', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 2, 'user_id' => 5, 'comment' => 'Informative and trendy.', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 3, 'user_id' => 6, 'comment' => 'Still love React more!', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 4, 'user_id' => 7, 'comment' => 'Tailwind has made my life easier.', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 5, 'user_id' => 8, 'comment' => 'Starting mine soon. Wish me luck!', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 6, 'user_id' => 9, 'comment' => 'Goa is magical!', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 7, 'user_id' => 10, 'comment' => 'Exactly what I needed. Thanks!', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 10, 'user_id' => 1, 'comment' => 'Meditation changed my mornings!', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
