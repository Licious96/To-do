<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/get_user/{id}', [UserController::class, 'get_user']);
Route::post('/update_user/{id}', [UserController::class, 'update']);
Route::post('/create/{id}', [TodoController::class, 'create']);
Route::get('/fetch_todo/{id}', [TodoController::class, 'fetch_todo']);
Route::post('/search/{id}', [TodoController::class, 'search']);
Route::get('/fetch_done/{id}', [TodoController::class, 'fetch_done']);
Route::post('/update/{id}', [TodoController::class, 'update']);
Route::delete('/destroy/{id}', [TodoController::class, 'destroy']);
Route::post('/done/{id}', [TodoController::class, 'done']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});