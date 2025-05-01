<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends BaseController
{
    public function index()
    {
        $posts = Post::with(['user', 'comments.user'])->get();
        return $this->sendResponse($posts, 'Posts fetched successfully.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'status' => 'nullable|in:active,inactive'
        ]);

        $data = $request->only(['user_id', 'title', 'content', 'image', 'status']);
        $data['slug'] = Str::slug($request->title);

        $post = Post::create($data);
        return $this->sendResponse($post, 'Post created successfully.');
    }

    public function show($id)
    {
        $post = Post::with(['user', 'comments.user'])->find($id);
        return $post
            ? $this->sendResponse($post, 'Post fetched successfully.')
            : $this->sendError('Post not found.');
    }

    public function update(Request $request, $id)
    {
        $post = Post::find($id);
        if (!$post) return $this->sendError('Post not found.');

        $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'image' => 'nullable|string',
            'status' => 'nullable|in:active,inactive'
        ]);

        $data = $request->only(['user_id', 'title', 'content', 'image', 'status']);
        if ($request->has('title')) {
            $data['slug'] = Str::slug($request->title);
        }

        $post->update($data);
        return $this->sendResponse($post, 'Post updated successfully.');
    }

    public function destroy($id)
    {
        $post = Post::find($id);
        if (!$post) return $this->sendError('Post not found.');

        $post->delete();
        return $this->sendResponse([], 'Post deleted successfully.');
    }
}
