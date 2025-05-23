<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Str;
use App\Http\Controllers\API\BaseController;
use Illuminate\Support\Facades\Validator;
use App\Helpers\StatusCode;
use Exception;

class ProductController extends BaseController
{
    public function index()
    {
        try {
            $products = Product::with(['category', 'subcategory'])->get();
            return $this->sendResponse($products, __('messages.product_fetched'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'price' => 'required|numeric',
                'category_id' => 'required|exists:categories,id',
                'subcategory_id' => 'nullable|exists:subcategories,id',
                'description' => 'nullable|string',
                'image' => 'nullable|string',
                'status' => 'nullable|in:active,inactive',
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $data = $request->only('name', 'description', 'price', 'category_id', 'subcategory_id', 'image', 'status');
            $data['slug'] = Str::slug($request->name);

            $product = Product::create($data);
            return $this->sendResponse($product, __('messages.product_created'), StatusCode::CREATED);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $product = Product::with(['category', 'subcategory'])->find($id);
            if (!$product) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }
            return $this->sendResponse($product, __('messages.product_fetched'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'price' => 'sometimes|numeric',
                'category_id' => 'sometimes|exists:categories,id',
                'subcategory_id' => 'nullable|exists:subcategories,id',
                'description' => 'nullable|string',
                'image' => 'nullable|string',
                'status' => 'nullable|in:active,inactive',
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $data = $request->only('name', 'description', 'price', 'category_id', 'subcategory_id', 'image', 'status');
            if ($request->has('name')) {
                $data['slug'] = Str::slug($request->name);
            }

            $product->update($data);
            return $this->sendResponse($product, __('messages.product_updated'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $product->delete();
            return $this->sendResponse([], __('messages.product_deleted'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }
}
