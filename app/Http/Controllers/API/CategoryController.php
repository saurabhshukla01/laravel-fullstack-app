<?php

namespace App\Http\Controllers\API;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\StatusCode;
use Carbon\Carbon;
use Exception;

class CategoryController extends BaseController
{
    public function index(Request $request)
    {
        try {
            $query = Category::query();

            // Apply search filter (by name)
            if ($request->has('search') && !empty($request->search)) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }

            // Apply date filter
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

                    case 'option-1': // All — no additional filter needed
                    default:
                        // Do nothing
                        break;
                }
            }

            // Paginate results
            $categories = $query->paginate(10);

            $response = [
                'success' => true,
                'message' => __('messages.category_fetched'),
                'data' => $categories->items(),
                'meta' => [
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
