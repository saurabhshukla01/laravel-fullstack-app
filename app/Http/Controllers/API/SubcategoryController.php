<?php

// File: app/Http/Controllers/API/SubcategoryController.php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Subcategory;

class SubcategoryController extends BaseController
{
    public function index()
    {
        return $this->sendResponse(Subcategory::with('category')->get(), 'Subcategories fetched successfully.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'category_id' => 'required|exists:categories,id'
        ]);

        $subcategory = Subcategory::create($request->only('name', 'description', 'category_id'));
        return $this->sendResponse($subcategory, 'Subcategory created successfully.');
    }

    public function show($id)
    {
        $subcategory = Subcategory::with('category')->find($id);
        return $subcategory
            ? $this->sendResponse($subcategory, 'Subcategory fetched successfully.')
            : $this->sendError('Subcategory not found.');
    }

    public function update(Request $request, $id)
    {
        $subcategory = Subcategory::find($id);
        if (!$subcategory) return $this->sendError('Subcategory not found.');

        $subcategory->update($request->only('name', 'description', 'category_id'));
        return $this->sendResponse($subcategory, 'Subcategory updated successfully.');
    }

    public function destroy($id)
    {
        $subcategory = Subcategory::find($id);
        if (!$subcategory) return $this->sendError('Subcategory not found.');

        $subcategory->delete();
        return $this->sendResponse([], 'Subcategory deleted successfully.');
    }
}
