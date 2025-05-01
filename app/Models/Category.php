<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'description'];

    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }

    // optional
    public function products() 
    {
        return $this->hasMany(Product::class);
    }
}
