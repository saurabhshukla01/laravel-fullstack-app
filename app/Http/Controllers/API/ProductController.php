<?php

// File: app/Http/Controllers/API/ProductController.php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductController extends BaseController
{
    public function index()
    {
        return $this->sendResponse(Product::with(['category', 'subcategory'])->get(), 'Products fetched successfully.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
        ]);

        $data = $request->only('name', 'description', 'price', 'category_id', 'subcategory_id', 'image', 'status');
        $data['slug'] = Str::slug($request->name);

        $product = Product::create($data);
        return $this->sendResponse($product, 'Product created successfully.');
    }

    public function show($id)
    {
        $product = Product::with(['category', 'subcategory'])->find($id);
        return $product
            ? $this->sendResponse($product, 'Product fetched successfully.')
            : $this->sendError('Product not found.');
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) return $this->sendError('Product not found.');

        $data = $request->only('name', 'description', 'price', 'category_id', 'subcategory_id', 'image', 'status');
        if ($request->has('name')) {
            $data['slug'] = Str::slug($request->name);
        }

        $product->update($data);
        return $this->sendResponse($product, 'Product updated successfully.');
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) return $this->sendError('Product not found.');

        $product->delete();
        return $this->sendResponse([], 'Product deleted successfully.');
    }
}

