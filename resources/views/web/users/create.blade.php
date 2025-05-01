{{-- resources/views/web/users/create.blade.php --}}
@extends('layouts.app')
@section('content')
<h2>Create User</h2>
<form action="{{ route('web.users.store') }}" method="POST">
    @csrf
    <div class="mb-3"><label>Name</label><input name="name" class="form-control"></div>
    <div class="mb-3"><label>Email</label><input name="email" class="form-control"></div>
    <div class="mb-3"><label>Gender</label><select name="gender" class="form-control"><option value="male">Male</option><option value="female">Female</option></select></div>
    <div class="mb-3"><label>Age</label><input name="age" class="form-control"></div>
    <div class="mb-3"><label>Date of Birth</label><input type="date" name="dob" class="form-control"></div>
    <div class="mb-3"><label>Password</label><input name="password" type="password" class="form-control"></div>
    <button class="btn btn-success">Save</button>
</form>
@endsection