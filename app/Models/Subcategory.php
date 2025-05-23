<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    protected $fillable = ['name', 'description', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // optional
    public function products()
    {
        return $this->hasMany(Product::class);
    }

}
