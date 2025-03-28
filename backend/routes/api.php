<?php

use App\Http\Controllers\AccountController;
use Illuminate\Support\Facades\Route;

Route::resource('accounts', AccountController::class);
Route::get('accounts/balance/{id}', [AccountController::class, 'get_balance']);
