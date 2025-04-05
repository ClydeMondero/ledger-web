<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

/**
 * Accounts
 */
Route::get('accounts/info', [AccountController::class, 'get_info']);
Route::get('accounts/balance/{id}', [AccountController::class, 'get_balance']);
Route::resource('accounts', AccountController::class);

/**
 * Transactions
 */
Route::get('transactions/networth', [TransactionController::class, 'get_networth']);
Route::resource('transactions', TransactionController::class);
