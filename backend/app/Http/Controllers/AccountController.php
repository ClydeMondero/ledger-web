<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use App\Models\Account;

class AccountController extends Controller
{

    private $ledgerPath;
    private $ledgerFile;

    public function __construct()
    {
        $this->ledgerPath = storage_path('app/ledger/ledger.exe');
        $this->ledgerFile = storage_path('app/ledger/transactions.ledger');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get accounts from ledger file
        $process = new Process([$this->ledgerPath, '-f', $this->ledgerFile,  'accounts', "--empty"]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        // Get the output as a single string
        $output = $process->getOutput();

        $accounts = preg_split('/\r\n|\r|\n/', trim($output));

        return response()->json(['message' => "Successfully fetched accounts.", 'accounts' => $accounts, 'success' => "true"]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate using Validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:accounts,name',
            'description' => 'nullable|string|max:1000',
            'balance' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
                'success' => false
            ]);
        }

        // Check if account exists in Ledger CLI
        $process = new Process([$this->ledgerPath, '-f', $this->ledgerFile,  'accounts', "--empty"]);
        $process->run();

        if (!$process->isSuccessful()) {
            return response()->json([
                'message' => 'Failed to fetch accounts from Ledger.',
                'error' => $process->getErrorOutput(),
                'success' => false
            ]);
        }

        $accounts = preg_split('/\r\n|\r|\n/', trim($process->getOutput()));

        if (in_array($request->name, $accounts)) {
            return response()->json([
                'message' => 'Account already exists in Ledger.',
                'success' => false
            ]);
        }

        // Create the account in the database
        $account = Account::create([
            'name' => $request->name,
            'description' => $request->description,
            'balance' => $request->balance,
        ]);

        // Create a ledger entry with an initial balance of 0
        $date = now()->format('Y-m-d');
        $ledgerEntry = "$date * Account Creation\n    {$request->name}  {$request->balance}\n    Equity:Opening-Balance\n";

        // Append the entry to the ledger file
        $writeSuccess = file_put_contents($this->ledgerFile, $ledgerEntry . "\n", FILE_APPEND);

        if ($writeSuccess === false) {
            return response()->json([
                'message' => 'Failed to write to Ledger file.',
                'success' => false
            ]);
        }

        // Fetch the balance only if the write was successful
        $process = new Process([$this->ledgerPath, '-f', $this->ledgerFile, 'balance', $request->name, '--empty']);
        $process->run();

        if (!$process->isSuccessful()) {
            return response()->json([
                'message' => 'Failed to fetch balance from Ledger.',
                'error' => $process->getErrorOutput(),
                'success' => false
            ]);
        }

        $balanceOutput = trim($process->getOutput());

        return response()->json([
            'message' => "Account created successfully in database and Ledger with an initial balance of {$request->balance}",
            'account' => $account,
            'balance' => $balanceOutput,
            'success' => true
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate using Validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:accounts,name',
            'description' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
                'success' => false
            ]);
        }

        // Find the account in the database
        $account = Account::find($id);
        if (!$account) {
            return response()->json([
                'message' => 'Account not found.',
                'success' => false
            ]);
        }

        // Check if the account name was changed
        $oldName = $account->name;
        $newName = $request->name;

        // Update the database record
        $account->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        // Update Ledger: Add a journal entry to reflect the update
        $date = now()->format('Y-m-d');

        $ledgerEntry = "$date * Account Update\n";

        // If the account name changed, show a transfer from the old to new
        if ($oldName !== $newName) {
            $ledgerEntry .= "    $oldName  -0.00\n    $newName  0.00\n";
        } else {
            // Otherwise, just add a note about the update
            $ledgerEntry .= "    $newName  0.00 ; Account details updated\n";
        }

        // Append the entry to the ledger file
        $writeSuccess = file_put_contents($this->ledgerFile, $ledgerEntry . "\n", FILE_APPEND);

        if ($writeSuccess === false) {
            return response()->json([
                'message' => 'Failed to write to Ledger file.',
                'success' => false
            ]);
        }

        return response()->json([
            'message' => 'Account updated successfully in database and Ledger.',
            'account' => $account,
            'success' => true
        ]);
    }

    /**
     * Get Accounts Info
     */

    public function get_info()
    {
        $accounts = Account::all();

        if (!$accounts) {
            return response()->json([
                'message' => 'Accounts not found.',
                'success' => false
            ]);
        }

        return response()->json([
            'message' => 'Accounts fetched successfully.',
            'accounts' => $accounts,
            'success' => true
        ]);
    }

    /**
     * Get Account Balance
     */
    public function get_balance(string $id)
    {
        // Find the account in the database
        $account = Account::find($id);

        if (!$account) {
            return response()->json([
                'message' => 'Account not found.',
                'success' => false
            ]);
        }

        $process = new Process([$this->ledgerPath, '-f', $this->ledgerFile, 'balance', $account->name, '--empty']);
        $process->run();

        if (!$process->isSuccessful()) {
            return response()->json([
                'message' => 'Failed to fetch balance from Ledger.',
                'error' => $process->getErrorOutput(),
                'success' => false
            ]);
        }

        $balanceOutput = trim($process->getOutput());

        return response()->json([
            'message' => 'Account balance fetched successfully.',
            'account' => $account,
            'balance' => $balanceOutput,
            'success' => true
        ]);
    }
}
