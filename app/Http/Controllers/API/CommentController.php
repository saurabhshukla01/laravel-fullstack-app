<?php

namespace App\Http\Controllers\API;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use Illuminate\Support\Facades\Validator;
use App\Helpers\StatusCode;
use Carbon\Carbon;
use Exception;

class CommentController extends BaseController
{
    // Get comments for All List
    public function commentAllList(Request $request)
    {
        try {
            $query = Comment::with('user', 'post');

            // Filter by search input (comment.name, comment.comment, post.title, user.name)
            if ($request->has('search') && !empty($request->search)) {
                $searchTerm = $request->search;

                $query->where(function ($q) use ($searchTerm) {
                    $q->where('comment', 'like', '%' . $searchTerm . '%')
                        ->orWhereHas('post', function ($q2) use ($searchTerm) {
                            $q2->where('title', 'like', '%' . $searchTerm . '%');
                        })
                        ->orWhereHas('user', function ($q3) use ($searchTerm) {
                            $q3->where('name', 'like', '%' . $searchTerm . '%');
                        });
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
            $comments = $query->paginate(100);

            // Return response
            $response = [
                'success' => true,
                'message' => __('messages.comment_fetched'),
                'data' => $comments->items(),
                'meta' => [
                    'current_page' => $comments->currentPage(),
                    'last_page' => $comments->lastPage(),
                    'per_page' => $comments->perPage(),
                    'total' => $comments->total(),
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


    // Get comments for a specific post
    public function index($postId)
    {
        try {
            $comments = Comment::with('user')->where('post_id', $postId)->get();
            return $this->sendResponse($comments, __('messages.comment_fetched'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    // Store a comment for a specific post
    public function store(Request $request, $postId)
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'comment' => 'required|string'
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $comment = Comment::create([
                'post_id' => $postId,
                'user_id' => $request->user_id,
                'comment' => $request->comment,
            ]);

            return $this->sendResponse($comment, __('messages.comment_created'), StatusCode::CREATED);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    // Create a comment for a specific post & user
    public function create(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'post_id' => 'required|exists:posts,id',
                'user_id' => 'required|exists:users,id',
                'comment' => 'required|string'
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $comment = Comment::create([
                'post_id' => $request->post_id,
                'user_id' => $request->user_id,
                'comment' => $request->comment,
            ]);

            return $this->sendResponse($comment, __('messages.comment_created'), StatusCode::CREATED);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    // Show a single comment
    public function show($id)
    {
        try {
            $comment = Comment::with('user')->find($id);

            if (!$comment) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            return $this->sendResponse($comment, __('messages.comment_fetched'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    // Update a comment
    public function update(Request $request, $id)
    {
        try {
            $comment = Comment::find($id);
            if (!$comment) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'comment' => 'required|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $comment->update(['comment' => $request->comment]);

            return $this->sendResponse($comment, __('messages.comment_updated'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    // Delete a comment
    public function destroy($id)
    {
        try {
            $comment = Comment::find($id);
            if (!$comment) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $comment->delete();
            return $this->sendResponse([], __('messages.comment_deleted'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }
}
