{{-- Example: resources/views/web/users/index.blade.php --}}
@extends('layouts.app')
@section('content')
<h2>Users</h2>
<a href="{{ route('web.users.create') }}" class="btn btn-primary mb-3">Create User</a>
<table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Gender</th><th>Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach($users as $user)
        <tr>
            <td>{{ $user->id }}</td><td>{{ $user->name }}</td><td>{{ $user->email }}</td><td>{{ $user->gender }}</td>
            <td>
                <a href="{{ route('web.users.edit', $user->id) }}" class="btn btn-sm btn-warning">Edit</a>
                <form action="{{ route('web.users.destroy', $user->id) }}" method="POST" style="display:inline">
                    @csrf @method('DELETE')
                    <button class="btn btn-sm btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection