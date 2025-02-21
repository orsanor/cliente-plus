<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;


Route::prefix('api')->group(function () {
    Route::get('/', function () {
    return view('welcome');
});

    Route::post('/signup', [AuthController::class, 'signup']);

    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/csrf-token', function (Request $request) {
        return response()->json([
            'csrf_token' => csrf_token()
        ]);
    });
});