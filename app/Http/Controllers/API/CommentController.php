<?php

namespace App\Http\Controllers\API;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use Illuminate\Support\Facades\Validator;
use App\Helpers\StatusCode;
use Exception;

class CommentController extends BaseController
{
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
