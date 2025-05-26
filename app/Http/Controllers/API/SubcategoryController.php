<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Subcategory;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Exception;
use App\Helpers\StatusCode;
use Carbon\Carbon;

class SubcategoryController extends BaseController
{
    public function index(Request $request)
    {
        try {
            $query = Subcategory::with('category');

            // Filter by subcategory name
            if ($request->has('search') && !empty($request->search)) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }

            // Filter by category name
            if ($request->has('category_name') && !empty($request->category_name)) {
                $query->whereHas('category', function ($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->category_name . '%');
                });
            }

            // Filter by created_at date range
            if ($request->has('filter')) {
                switch ($request->filter) {
                    case 'option-2': // This week
                        $query->where('created_at', '>=', Carbon::now()->startOfWeek());
                        break;

                    case 'option-3': // This month
                        $query->where('created_at', '>=', Carbon::now()->startOfMonth());
                        break;

                    case 'option-4': // Last 3 months
                        $query->where('created_at', '>=', Carbon::now()->subMonths(3));
                        break;

                    case 'option-1': // All
                    default:
                        // No filter
                        break;
                }
            }

            // Paginate
            $subcategories = $query->paginate(10);

            // Return response
            $response = [
                'success' => true,
                'message' => __('messages.subcategory_fetched'),
                'data' => $subcategories->items(),
                'meta' => [
                    'current_page' => $subcategories->currentPage(),
                    'last_page' => $subcategories->lastPage(),
                    'per_page' => $subcategories->perPage(),
                    'total' => $subcategories->total(),
                ],
            ];

            return response()->json($response, StatusCode::OK);
        } catch (\Exception $e) {
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
