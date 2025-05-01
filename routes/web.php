<?php

use App\Http\Controllers\Web\HomeController;
use App\Models\Post;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', function () {
    return "This is the About Page!";
});

Route::get('/home', [HomeController::class, 'index']);

Route::get('/blog', function () {
    $posts = Post::with('user')->latest()->get();
    return view('blog.index', compact('posts'));
});

Route::get('/blog/{id}', function ($id) {
    $post = Post::with('comments.user')->findOrFail($id);
    return view('blog.show', compact('post'));
});