<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\API\BaseController;
use Illuminate\Support\Facades\Validator;
use App\Helpers\StatusCode;
use Exception;

class PostController extends BaseController
{
    public function index()
    {
        try {
            $posts = Post::with(['user', 'comments.user'])->get();
            return $this->sendResponse($posts, __('messages.post_fetched'), StatusCode::OK);
        } catch (Exception $e) {
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
                'status' => 'nullable|in:active,inactive',
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
                'status' => 'nullable|in:active,inactive',
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
