<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class BalanceController extends Controller
{
    private $ledgerFile;

    public function __construct()
    {
        $this->ledgerFile = storage_path('app/ledger/transactions.ledger');
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $process = new Process(['ledger', '-f', $this->ledgerFile, 'balance', "--no-total", "Assets"]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        // Get the output as a single string
        $output = $process->getOutput();

        // Split the output into parts (amount + account)
        // Regex splits on amounts (₱ followed by numbers)
        $parts = preg_split('/(?=₱[\d,.]+)/', trim($output), -1, PREG_SPLIT_NO_EMPTY);

        $result = [];
        foreach ($parts as $part) {
            // Match the amount and account name in each part
            if (preg_match('/^(₱[\d,.]+)\s+(.*)$/', trim($part), $matches)) {
                $amount = $matches[1]; // e.g., ₱239.00
                $account = rtrim($matches[2], ':'); // Remove trailing colon if present
                $result[$account] = $amount; // Add to result
            }
        }

        return response()->json($result);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
