<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LedgerController;
use App\Http\Controllers\BalanceController;


Route::resource('ledger', LedgerController::class);
Route::resource('balance', BalanceController::class);
