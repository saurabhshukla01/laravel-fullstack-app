<?php

// database/seeders/SubCategorySeeder.php

namespace Database\Seeders;

use App\Models\Subcategory;
use Illuminate\Database\Seeder;

class SubCategorySeeder extends Seeder
{
    public function run(): void
    {
        $subcategories = [
            ['category_id' => 1, 'name' => 'Sofas', 'description' => 'Sofas and couches'],
            ['category_id' => 1, 'name' => 'Chairs', 'description' => 'Chairs'],
            ['category_id' => 2, 'name' => 'TVs', 'description' => 'Televisions'],
            ['category_id' => 2, 'name' => 'Laptops', 'description' => 'Laptops and Computers'],
            ['category_id' => 3, 'name' => 'Lighting_1', 'description' => 'Lighting'],
            ['category_id' => 3, 'name' => 'Ceiling Lights', 'description' => 'Ceiling lighting'],
            ['category_id' => 4, 'name' => 'Microwaves', 'description' => 'Microwave ovens'],
            ['category_id' => 4, 'name' => 'Refrigerators', 'description' => 'Fridges'],
            ['category_id' => 5, 'name' => 'Wall Art', 'description' => 'Art and frames'],
            ['category_id' => 5, 'name' => 'Clocks', 'description' => 'Wall and desk clocks'],
        ];

        foreach ($subcategories as $sub) {
            Subcategory::create($sub);
        }
    }
}

