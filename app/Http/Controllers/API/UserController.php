<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends BaseController
{
    // List all users
    public function index()
    {
        $users = User::all();
        return $this->sendResponse($users, 'Users fetched successfully.');
    }

    // Show a single user with posts
    public function show($id)
    {
        $user = User::with('posts')->find($id);

        return $user
            ? $this->sendResponse($user, 'User fetched successfully.')
            : $this->sendError('User not found.');
    }

    // Store a new user
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'            => 'required|string|max:255',
            'email'           => 'required|email|unique:users,email',
            'profile_image'   => 'nullable|string',
            'gender'          => 'required|in:male,female,other',
            'age'             => 'required|integer|min:0',
            'dob'             => 'required|date',
            'is_admin'        => 'required|boolean',
            'password'        => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = User::create([
            'name'            => $request->name,
            'email'           => $request->email,
            'profile_image'   => $request->profile_image,
            'gender'          => $request->gender,
            'age'             => $request->age,
            'dob'             => $request->dob,
            'is_admin'        => $request->is_admin,
            'password'        => Hash::make($request->password),
        ]);

        return $this->sendResponse($user, 'User created successfully.');
    }

    // Update a user
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) return $this->sendError('User not found.');

        $validator = Validator::make($request->all(), [
            'name'            => 'sometimes|string|max:255',
            'email'           => 'sometimes|email|unique:users,email,' . $id,
            'profile_image'   => 'nullable|string',
            'gender'          => 'sometimes|in:male,female,other',
            'age'             => 'sometimes|integer|min:0',
            'dob'             => 'sometimes|date',
            'is_admin'        => 'sometimes|boolean',
            // 'password'        => 'sometimes|min:6',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $request->only(['name', 'email', 'profile_image', 'gender', 'age', 'dob', 'is_admin']);
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);
        return $this->sendResponse($user, 'User updated successfully.');
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) return $this->sendError('User not found.');

        $user->delete();
        return $this->sendResponse([], 'User deleted successfully.');
    }
}
