{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Dashboard</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="/users">Users</a></li>
                    <li class="nav-item"><a class="nav-link" href="/posts">Posts</a></li>
                    <li class="nav-item"><a class="nav-link" href="/comments">Comments</a></li>
                    <li class="nav-item"><a class="nav-link" href="/categories">Categories</a></li>
                    <li class="nav-item"><a class="nav-link" href="/subcategories">Subcategories</a></li>
                    <li class="nav-item"><a class="nav-link" href="/products">Products</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        @yield('content')
    </div>
</body>
</html>