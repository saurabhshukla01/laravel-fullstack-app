<?php

namespace App\Http\Controllers\API;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends BaseController
{
    // Get comments for a specific post
    public function index($postId)
    {
        $comments = Comment::with('user')->where('post_id', $postId)->get();

        return $this->sendResponse($comments, 'Comments fetched successfully.');
    }

    // Store a comment for a specific post
    public function store(Request $request, $postId)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'comment' => 'required|string'
        ]);

        $comment = Comment::create([
            'post_id' => $postId,
            'user_id' => $request->user_id,
            'comment' => $request->comment,
        ]);

        return $this->sendResponse($comment, 'Comment added successfully.');
    }

    // Show a single comment
    public function show($id)
    {
        $comment = Comment::with('user')->find($id);

        return $comment
            ? $this->sendResponse($comment, 'Comment fetched successfully.')
            : $this->sendError('Comment not found.');
    }

    // Update a comment
    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);
        if (!$comment) return $this->sendError('Comment not found.');

        $request->validate([
            'comment' => 'required|string',
        ]);

        $comment->update([
            'comment' => $request->comment,
        ]);

        return $this->sendResponse($comment, 'Comment updated successfully.');
    }

    // Delete a comment
    public function destroy($id)
    {
        $comment = Comment::find($id);
        if (!$comment) return $this->sendError('Comment not found.');

        $comment->delete();
        return $this->sendResponse([], 'Comment deleted successfully.');
    }
}
