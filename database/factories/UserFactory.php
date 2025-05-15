<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class UserFactory extends Factory
{
    protected $model = User::class;
    public function definition(): array
    {
        return [
            'name' => fake()->name,
            'email' => fake()->unique()->safeEmail,
            'profile_image' => null,
            'gender' => fake()->randomElement(['male', 'female', 'other']),
            'age' => rand(18, 60),
            'dob' => now()->subYears(rand(18, 60))->format('Y-m-d'),
            'is_admin' => fake()->boolean(20),
            'password' => Hash::make('123456'),
            'remember_token' => Str::random(10),
        ];
    }
}

