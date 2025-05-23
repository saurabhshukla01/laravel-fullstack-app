<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    public function sendResponse($result, $message = '', $code = 200)
    {
        return response()->json([
            'success' => true,
            'data'    => $result,
            'message' => $message,
            'code'    => $code,
        ], $code);
    }

    public function sendError($error, $errorMessages = [], $code = 404)
    {
        return response()->json([
            'success' => false,
            'message' => $error,
            'errors'  => $errorMessages,
            'code'    => $code,
        ], $code);
    }
}
