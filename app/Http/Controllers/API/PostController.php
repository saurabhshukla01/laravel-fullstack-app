<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\API\BaseController;
use Illuminate\Support\Facades\Validator;
use App\Helpers\StatusCode;
use Carbon\Carbon;
use Exception;

class PostController extends BaseController
{
    public function index(Request $request)
    {
        try {
            $query = Post::with(['user', 'comments.user']);

            // Filter by post title
            if ($request->has('search') && !empty($request->search)) {
                $query->where('title', 'like', '%' . $request->search . '%');
            }

            // Filter by user name
            if ($request->has('user_name') && !empty($request->user_name)) {
                $query->whereHas('user', function ($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->user_name . '%');
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

            // Paginate results
            $posts = $query->paginate(100);

            // Construct response
            return response()->json([
                'success' => true,
                'message' => __('messages.post_fetched'),
                'data' => $posts->items(),
                'meta' => [
                    'current_page' => $posts->currentPage(),
                    'last_page' => $posts->lastPage(),
                    'per_page' => $posts->perPage(),
                    'total' => $posts->total(),
                ],
            ], StatusCode::OK);
        } catch (\Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }


    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'image' => 'nullable|string', 
                'status' => 'nullable|in:draft,published',
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $data = $request->only(['user_id', 'title', 'content', 'image', 'status']);
            $data['slug'] = Str::slug($request->title);

            $post = Post::create($data);
            return $this->sendResponse($post, __('messages.post_created'), StatusCode::CREATED);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $post = Post::with(['user', 'comments.user'])->find($id);
            if (!$post) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }
            return $this->sendResponse($post, __('messages.post_fetched'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $post = Post::find($id);
            if (!$post) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'user_id' => 'sometimes|exists:users,id',
                'title' => 'sometimes|string|max:255',
                'content' => 'sometimes|string',
                'image' => 'nullable|string',
                'status' => 'nullable|in:draft,published',
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $data = $request->only(['user_id', 'title', 'content', 'image', 'status']);
            if ($request->has('title')) {
                $data['slug'] = Str::slug($request->title);
            }

            $post->update($data);
            return $this->sendResponse($post, __('messages.post_updated'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $post = Post::find($id);
            if (!$post) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $post->delete();
            return $this->sendResponse([], __('messages.post_deleted'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }
}
