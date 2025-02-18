<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class LedgerController extends Controller
{
    private $ledgerFile;

    public function __construct()
    {
        $this->ledgerFile = storage_path('app/ledger/transactions.ledger');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $account = strtolower($request->input('account'));

        //give accounts if no account is given
        if (!$account) {
            //get accounts from ledger file
            $process = new Process(['ledger', '-f', $this->ledgerFile,  'accounts']);
            $process->run();

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }

            // Get the output as a single string
            $output = $process->getOutput();

            // Split the raw data into lines
            $lines = explode("\n", $output);
            $topLevelAccounts = [];

            foreach ($lines as $line) {
                $line = strtolower(trim($line)); // Remove extra spaces and make lowercase

                if (empty($line)) {
                    continue; // Skip empty lines
                }

                // Split each line into parts by ":"
                $parts = explode(":", strtolower(trim($line)));
                $topLevel = $parts[0]; // First part is the top-level account

                // Add top-level account to the array if it's not already included
                if (!in_array($topLevel, $topLevelAccounts)) {
                    $topLevelAccounts[] = $topLevel;
                }
            }


            //return array of accounts
            return response()->json([
                'message' => 'Successfully fetched accounts',
                'accounts' => $topLevelAccounts
            ]);
        }

        $process = new Process(['ledger', '-f', $this->ledgerFile, 'balance', "--no-total", $account]);
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
        $total = 0.0;

        foreach ($parts as $part) {
            // Match the amount and account name in each part
            if (preg_match('/^(₱[\d,.]+)\s+(.*)$/', trim($part), $matches)) {
                $amount = $matches[1]; // e.g., ₱239.00
                $formatted_account = rtrim($matches[2], ':'); // Remove trailing colon if present

                // Convert account name to lowercase and exclude the specified category
                $formatted_account = strtolower($formatted_account);
                if ($formatted_account !== $account) {
                    // Convert the amount to a numeric value (remove ₱ and commas)
                    $numericAmount = (float)str_replace(['₱', ','], '', $amount);
                    $total += $numericAmount; // Add to total
                    $result[$formatted_account] = $amount; // Add to result
                }
            }
        }

        return response()->json([
            "message" => "Successfully fetched balance for $account",
            "balance" => $result,
            "total" => "₱" . number_format($total, 2), // Format total as currency
        ]);
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
        $amount = $request->input('amount');
        $payee = $request->input('payee');
        $date = $request->input('date');
        $recipient = $request->input('recipient');
        $sender = $request->input('sender');

        // Validate required fields
        if (!$amount || !$payee || !$date || !$recipient || !$sender) {
            return response()->json(["message" => "All fields are required."], 400);
        }

        // Construct the ledger transaction entry
        $transaction = <<<EOL
$date $payee
    $sender    -$amount
    $recipient  $amount
EOL;

        // Append the transaction to the ledger file
        file_put_contents($this->ledgerFile, "\n" . $transaction, FILE_APPEND);

        return response()->json([
            "message" => "Successfully added $amount from $sender to $recipient at $date",
            "transaction" => $transaction,
        ]);
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
