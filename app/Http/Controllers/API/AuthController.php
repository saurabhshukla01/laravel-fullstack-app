<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Helpers\StatusCode;
use Exception;

class AuthController extends BaseController
{
    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string|min:6'
            ]);

            if ($validator->fails()) {
                return $this->sendError(__('messages.validation_error'), $validator->errors(), StatusCode::VALIDATION_ERROR);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            $data = [
                'token' => $token,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
            ];

            return $this->sendResponse($data, __('messages.register_success'), StatusCode::CREATED);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->only('email', 'password');

            $user = User::where('email', $credentials['email'])->first();

            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return $this->sendError(__('messages.invalid_credentials'), [], StatusCode::UNAUTHORIZED);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            $data = [
                'token' => $token,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
            ];

            return $this->sendResponse($data, __('messages.login_success'), StatusCode::OK);
        } catch (Exception $e) {
            return $this->sendError(__('messages.general_error'), [], StatusCode::SERVER_ERROR);
        }
    }
}
