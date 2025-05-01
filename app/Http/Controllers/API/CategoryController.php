<?php
// File: app/Http/Controllers/API/CategoryController.php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends BaseController
{
    public function index()
    {
        return $this->sendResponse(Category::all(), 'Categories fetched successfully.');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required']);
        $category = Category::create($request->only('name', 'description'));
        return $this->sendResponse($category, 'Category created successfully.');
    }

    public function show($id)
    {
        $category = Category::find($id);
        return $category
            ? $this->sendResponse($category, 'Category fetched successfully.')
            : $this->sendError('Category not found.');
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) return $this->sendError('Category not found.');

        $category->update($request->only('name', 'description'));
        return $this->sendResponse($category, 'Category updated successfully.');
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) return $this->sendError('Category not found.');

        $category->delete();
        return $this->sendResponse([], 'Category deleted successfully.');
    }
}
