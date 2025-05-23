<?php

namespace App\Http\Controllers\API;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\StatusCode;
use Exception;

class CategoryController extends BaseController
{
    public function index(Request $request)
    {
        try {
            // Get paginated categories (10 per page)
            $categories = Category::paginate(10);

            // Prepare response structure similar to your current format
            $response = [
                'success' => true,
                'message' => __('messages.category_fetched'),
                'data' => $categories->items(),         // only category items list
                'meta' => [                       // add pagination metadata
                    'current_page' => $categories->currentPage(),
                    'last_page' => $categories->lastPage(),
                    'per_page' => $categories->perPage(),
                    'total' => $categories->total(),
                ],
            ];

            return response()->json($response, StatusCode::OK);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => __('messages.general_error'),
                'data' => [],
            ], StatusCode::SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $category = Category::create($request->only('name', 'description'));

            return $this->sendResponse($category, __('messages.category_created'), StatusCode::CREATED);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $category = Category::find($id);

            if (!$category) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            return $this->sendResponse($category, __('messages.category_fetched'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $category = Category::find($id);

            if (!$category) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $category->update($request->only('name', 'description'));

            return $this->sendResponse($category, __('messages.category_updated'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $category = Category::find($id);

            if (!$category) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $category->delete();

            return $this->sendResponse([], __('messages.category_deleted'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }
}
