<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;


Route::prefix('api')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        
        // Rotas específicas para o perfil do usuário
        Route::put('/user/profile', [UserController::class, 'updateProfile']);
        Route::delete('/user/profile', [UserController::class, 'deleteProfile']);
        
        // Rotas para gerenciamento geral de usuários
        Route::apiResource('/users', UserController::class);
    });

    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/csrf-token', function (Request $request) {
        return response()->json([
            'csrf_token' => csrf_token()
        ]);
    });
});