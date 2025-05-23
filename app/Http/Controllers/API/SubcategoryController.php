<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Subcategory;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Exception;
use App\Helpers\StatusCode;

class SubcategoryController extends BaseController
{
    public function index()
    {
        try {
            $subcategories = Subcategory::with('category')->get();
            return $this->sendResponse($subcategories, __('messages.subcategory_fetched'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'category_id' => 'required|exists:categories,id',
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $data = $request->only('name', 'description', 'category_id');
            $data['slug'] = Str::slug($request->name);

            $subcategory = Subcategory::create($data);
            return $this->sendResponse($subcategory, __('messages.subcategory_created'), StatusCode::CREATED);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $subcategory = Subcategory::with('category')->find($id);
            if (!$subcategory) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }
            return $this->sendResponse($subcategory, __('messages.subcategory_fetched'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $subcategory = Subcategory::find($id);
            if (!$subcategory) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'category_id' => 'required|exists:categories,id',
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $data = $request->only('name', 'description', 'category_id');
            if ($request->has('name')) {
                $data['slug'] = Str::slug($request->name);
            }

            $subcategory->update($data);
            return $this->sendResponse($subcategory, __('messages.subcategory_updated'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $subcategory = Subcategory::find($id);
            if (!$subcategory) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $subcategory->delete();
            return $this->sendResponse([], __('messages.subcategory_deleted'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }
}
