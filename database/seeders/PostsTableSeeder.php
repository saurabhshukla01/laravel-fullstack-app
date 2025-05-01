<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostsTableSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            ['user_id' => 1, 'title' => 'Top 5 Laravel Tips', 'content' => 'Here are some tips...', 'image' => 'laravel-tips.jpg', 'status' => 'published'],
            ['user_id' => 2, 'title' => 'New Fashion Trends 2025', 'content' => 'Explore trends...', 'image' => 'fashion.jpg', 'status' => 'published'],
            ['user_id' => 3, 'title' => 'React vs Vue', 'content' => 'Comparison in 2025...', 'image' => null, 'status' => 'draft'],
            ['user_id' => 4, 'title' => 'Why Tailwind CSS', 'content' => 'Tailwind is amazing...', 'image' => 'tailwind.jpg', 'status' => 'published'],
            ['user_id' => 5, 'title' => 'Start a YouTube Channel', 'content' => 'Get started with video...', 'image' => null, 'status' => 'draft'],
            ['user_id' => 6, 'title' => 'Places to Visit in Goa', 'content' => 'Beaches, forts...', 'image' => 'goa.jpg', 'status' => 'published'],
            ['user_id' => 7, 'title' => 'Healthy Diet Plan', 'content' => 'Nutrition tips...', 'image' => 'diet.jpg', 'status' => 'published'],
            ['user_id' => 8, 'title' => 'Best Laptops for Devs', 'content' => 'Performance review...', 'image' => null, 'status' => 'draft'],
            ['user_id' => 9, 'title' => 'Freelance as Designer', 'content' => 'My journey...', 'image' => 'freelance.jpg', 'status' => 'published'],
            ['user_id' => 10, 'title' => 'Benefits of Meditation', 'content' => 'Mental health benefits...', 'image' => 'meditation.jpg', 'status' => 'published'],
        ];

        foreach ($posts as &$post) {
            $post['slug'] = Str::slug($post['title']) . '-' . uniqid();
            $post['created_at'] = now();
            $post['updated_at'] = now();
        }

        DB::table('posts')->insert($posts);
    }
}
