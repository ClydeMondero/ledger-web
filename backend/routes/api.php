<?php

use App\Http\Controllers\AccountController;
use Illuminate\Support\Facades\Route;

Route::get('accounts/info', [AccountController::class, 'get_info']);
Route::get('accounts/balance/{id}', [AccountController::class, 'get_balance']);
Route::resource('accounts', AccountController::class);
