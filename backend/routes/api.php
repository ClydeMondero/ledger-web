<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

/**
 * Accounts
 */
Route::get('accounts/info', [AccountController::class, 'get_info']);
Route::get('accounts/balances', [AccountController::class, 'get_balances']);
Route::resource('accounts', AccountController::class);

/**
 * Transactions
 */
Route::get('transactions/networth', [TransactionController::class, 'get_networth']);
Route::resource('transactions', TransactionController::class);
