<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Product;
use App\Models\Subcategory;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        $data = [
            'categories' => $this->getStats(Category::class, $yesterday, $today),
            'comments' => $this->getStats(Comment::class, $yesterday, $today),
            'posts' => array_merge(
                $this->getStats(Post::class, $yesterday, $today),
                [
                    'draft' => Post::where('status', 'draft')->count(),
                    'published' => Post::where('status', 'published')->count(),
                ]
            ),
            'products' => $this->getStats(Product::class, $yesterday, $today),
            'subcategories' => $this->getStats(Subcategory::class, $yesterday, $today),
            'users' => $this->getStats(User::class, $yesterday, $today),
        ];

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    private function getStats($model, $yesterday, $today)
    {
        $total = $model::count();

        $yesterdayCount = $model::whereDate('created_at', $yesterday)->count();
        $todayCount = $model::whereDate('created_at', $today)->count();

        $diff = $todayCount - $yesterdayCount;
        $percentage = $yesterdayCount > 0
            ? round(($diff / $yesterdayCount) * 100, 2)
            : ($todayCount > 0 ? 100 : 0); // avoid divide by zero

        return [
            'count' => $total,
            'percentage_change' => $percentage,
        ];
    }
}
