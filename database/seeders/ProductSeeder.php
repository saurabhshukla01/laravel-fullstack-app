<?php

// database/seeders/ProductSeeder.php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => '9-1 Seater Sofa', 'description' => 'Sofa is good one things', 'price' => 89600.00, 'category_id' => 1, 'subcategory_id' => 1],
            ['name' => '3-Seater Sofa', 'description' => 'Comfortable for a family', 'price' => 50000.00, 'category_id' => 1, 'subcategory_id' => 1],
            ['name' => 'LED TV 55 Inch', 'description' => 'Smart LED TV', 'price' => 65000.00, 'category_id' => 2, 'subcategory_id' => 3],
            ['name' => 'MacBook Pro', 'description' => 'Apple Laptop 13 inch', 'price' => 120000.00, 'category_id' => 2, 'subcategory_id' => 4],
            ['name' => 'Modern Wall Light', 'description' => 'Stylish wall light', 'price' => 3000.00, 'category_id' => 3, 'subcategory_id' => 5],
            ['name' => 'Microwave Oven', 'description' => '20L microwave oven', 'price' => 6000.00, 'category_id' => 4, 'subcategory_id' => 7],
            ['name' => 'Refrigerator Double Door', 'description' => '250L capacity', 'price' => 15000.00, 'category_id' => 4, 'subcategory_id' => 8],
            ['name' => 'Wooden Wall Clock', 'description' => 'Antique style wall clock', 'price' => 2500.00, 'category_id' => 5, 'subcategory_id' => 10],
            ['name' => 'Ceiling Light', 'description' => 'LED ceiling light', 'price' => 4500.00, 'category_id' => 3, 'subcategory_id' => 6],
            ['name' => 'Office Chair', 'description' => 'Ergonomic design', 'price' => 7000.00, 'category_id' => 9, 'subcategory_id' => 2],
        ];

        // Loop multiple times to reach 30 records
        for ($i = 0; $i < 3; $i++) {
            foreach ($products as $prod) {
                $prod['slug'] = Str::slug($prod['name']) . '-' . uniqid();
                $prod['status'] = 'active';
                Product::create($prod);
            }
        }
    }
}

