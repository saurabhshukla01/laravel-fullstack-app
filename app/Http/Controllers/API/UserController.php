<?php

namespace App\Http\Controllers\API;

use App\Helpers\StatusCode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Exception;

class UserController extends BaseController
{
    // List all users
    public function index()
    {
        try {
            $users = User::all();
            return $this->sendResponse($users, __('messages.users_fetched'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    // Show a single user with posts
    public function show($id)
    {
        try {
            $user = User::with('posts')->find($id);
            if (!$user) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            return $this->sendResponse($user, __('messages.user_fetched'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    // Create a new user
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name'          => 'required|string|max:255',
                'email'         => 'required|email|unique:users,email',
                'profile_image' => 'nullable|string',
                'gender'        => 'required|in:male,female,other',
                'age'           => 'required|integer|min:0',
                'dob'           => 'required|date',
                'is_admin'      => 'required|boolean',
                'password'      => 'required|string|min:6',
            ]);

            $user = User::create([
                'name'          => $request->name,
                'email'         => $request->email,
                'profile_image' => $request->profile_image,
                'gender'        => $request->gender,
                'age'           => $request->age,
                'dob'           => $request->dob,
                'is_admin'      => $request->is_admin,
                'password'      => Hash::make($request->password),
            ]);

            return $this->sendResponse($user, __('messages.user_created'), StatusCode::CREATED);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    // Update existing user
    public function update(Request $request, $id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $request->validate([
                'name'          => 'sometimes|string|max:255',
                'email'         => 'sometimes|email|unique:users,email,' . $id,
                'profile_image' => 'nullable|string',
                'gender'        => 'sometimes|in:male,female,other',
                'age'           => 'sometimes|integer|min:0',
                'dob'           => 'sometimes|date',
                'is_admin'      => 'sometimes|boolean',
                'password'      => 'sometimes',
            ]);

            $data = $request->only(['name', 'email', 'profile_image', 'gender', 'age', 'dob', 'is_admin']);

            if ($request->filled('password')) {
                $data['password'] = Hash::make($request->password);
            }

            $user->update($data);

            return $this->sendResponse($user, __('messages.user_updated'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    // Delete a user
    public function destroy($id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return $this->sendError(__('messages.not_found'), [], StatusCode::NOT_FOUND);
            }

            $user->delete();
            return $this->sendResponse([], __('messages.user_deleted'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }
}
