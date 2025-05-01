<?php

use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\SubcategoryController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/status', function () {
    return response()->json(['status' => 'API is working!']);
});

// create comments routes api 
Route::prefix('posts/{postId}')->group(function () {
    Route::get('comments', [CommentController::class, 'index']);
    Route::post('comments', [CommentController::class, 'store']);
});
Route::get('comments/{id}', [CommentController::class, 'show']);
Route::put('comments/{id}', [CommentController::class, 'update']);
Route::delete('comments/{id}', [CommentController::class, 'destroy']);
// users api routes
Route::apiResource('/users', UserController::class);
// posts api routes
Route::apiResource('/posts', PostController::class);
// categories api routes
Route::apiResource('/categories', CategoryController::class);
// subcategories api routes
Route::apiResource('/subcategories', SubcategoryController::class);
// products api routes
Route::apiResource('/products', ProductController::class);
