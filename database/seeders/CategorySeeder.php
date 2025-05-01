<?php

// database/seeders/CategorySeeder.php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Furniture', 'description' => 'Furniture'],
            ['name' => 'Electronics', 'description' => 'Electronics'],
            ['name' => 'Lighting', 'description' => 'Lighting'],
            ['name' => 'Appliances', 'description' => 'Appliances'],
            ['name' => 'Decor', 'description' => 'Home Decor'],
            ['name' => 'Outdoor', 'description' => 'Outdoor Items'],
            ['name' => 'Storage', 'description' => 'Storage Solutions'],
            ['name' => 'Bedding', 'description' => 'Bedding Items'],
            ['name' => 'Office', 'description' => 'Office Furniture'],
            ['name' => 'Kids', 'description' => 'Kids Furniture'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }
    }
}

