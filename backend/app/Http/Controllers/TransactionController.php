<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Process\Process;


class TransactionController extends Controller
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
        $transactions = Transaction::all();

        if (!$transactions) {
            return response()->json([
                'message' => 'Transactions not found.',
                'success' => false
            ]);
        }

        return response()->json([
            'message' => 'Transactions fetched successfully.',
            'transactions' => $transactions,
            'success' => true
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate using Validator
        $validator = Validator::make($request->all(), [
            'payee' => 'required|string|max:255',
            'balance' => 'required|integer',
            'from_account' => 'required|string|exists:accounts,name',
            'to_account' => 'required|string|exists:accounts,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'There was an issue with your input.',
                'errors' => $validator->errors(),
                'success' => false
            ], 422);
        }


        // Create the transaction in the database
        $transaction = Transaction::create([
            'payee' => $request->payee,
            'balance' => $request->balance,
            'from_account' => $request->from_account,
            'to_account' => $request->to_account,
        ]);

        // Update accounts balance in the database
        $fromAccount = Account::where('name', $request->from_account)->first();
        $fromAccount->balance -= $request->balance;
        $fromAccount->save();

        $toAccount = Account::where('name', $request->to_account)->first();
        $toAccount->balance += $request->balance;
        $toAccount->save();

        // Create a ledger entry
        $date = now()->format('Y-m-d');
        $ledgerEntry = "$date * {$request->payee}\n    {$request->to_account}  {$request->balance}\n    {$request->from_account} ;transacId:{$transaction->id}\n";

        // Append the entry to the ledger file
        $writeSuccess = file_put_contents($this->ledgerFile, $ledgerEntry . "\n", FILE_APPEND);

        if ($writeSuccess === false) {
            return response()->json([
                'message' => 'Failed to write to Ledger file.',
                'success' => false
            ], 500);
        }

        return response()->json([
            'message' => "Transaction created successfully.",
            'transaction' => $transaction,
            'success' => true
        ], 201);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate using Validator
        $validator = Validator::make($request->all(), [
            'payee' => 'required|string|max:255',
            'balance' => 'required|integer',
            'from_account' => 'required|string|exists:accounts,name',
            'to_account' => 'required|string|exists:accounts,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
                'success' => false
            ], 400);
        }

        // Get transaction
        $transaction = Transaction::find($id);
        if (!$transaction) {
            return response()->json([
                'message' => 'Transaction not found.',
                'success' => false
            ], 404);
        }

        // Reverse previous account changes in database
        $previous_balance = $transaction->balance;

        $from_account = Account::where('name', $transaction->from_account)->first();
        if (!$from_account) {
            return response()->json([
                'message' => 'From Account not found',
                'success' => false
            ], 404);
        }
        $to_account = Account::where('name', $transaction->to_account)->first();
        if (!$to_account) {
            return response()->json([
                'message' => 'To Account not found',
                'success' => false
            ], 404);
        }

        $from_account->balance += $previous_balance;
        $to_account->balance -= $previous_balance;

        // Save changes to database
        $from_account->save();
        $to_account->save();

        // Reverse changes in Ledger file
        $date = now()->format('Y-m-d');
        $ledgerEntry = "$date * Reversal of {$request->payee}\n    {$request->from_account}  {$request->balance}\n    {$request->to_account} ;transacId:{$transaction->id}-reversed\n";

        // Append the entry to the ledger file
        $writeSuccess = file_put_contents($this->ledgerFile, $ledgerEntry . "\n", FILE_APPEND);

        if ($writeSuccess === false) {
            return response()->json([
                'message' => 'Failed to write to Ledger file.',
                'success' => false
            ], 500);
        }

        // Update transaction changes in database
        $transaction->update([
            'payee' => $request->payee,
            'balance' => $request->balance,
            'from_account' => $request->from_account,
            'to_account' => $request->to_account,
        ]);

        // Update accounts balance in the database
        $fromAccount = Account::where('name', $request->from_account)->first();
        $fromAccount->balance -= $request->balance;
        $fromAccount->save();

        $toAccount = Account::where('name', $request->to_account)->first();
        $toAccount->balance += $request->balance;
        $toAccount->save();

        // Update changes in Ledger file
        $date = now()->format('Y-m-d');
        $ledgerEntry = "$date * {$request->payee}\n    {$request->to_account}  {$request->balance}\n    {$request->from_account} ;transacId:{$transaction->id}\n";

        // Append the entry to the ledger file
        $writeSuccess = file_put_contents($this->ledgerFile, $ledgerEntry . "\n", FILE_APPEND);

        if ($writeSuccess === false) {
            return response()->json([
                'message' => 'Failed to write to Ledger file.',
                'success' => false
            ], 500);
        }

        return response()->json([
            'message' => "Transaction updated successfully.",
            'transaction' => $transaction,
            'success' => true
        ], 200);
    }

    public function get_networth()
    {
        $networths = \DB::select('
            SELECT
                DATE_FORMAT(created_at, "%Y-%m") AS date,
                SUM(CASE
                    WHEN from_account LIKE "Assets:%" THEN -balance  -- Withdrawals decrease net worth
                    WHEN to_account LIKE "Assets:%" THEN balance    -- Deposits increase net worth
                    ELSE 0
                END) AS netWorth
            FROM transactions
            GROUP BY DATE_FORMAT(created_at, "%Y-%m")
            ORDER BY date
        ');


        return response()->json([
            'message' => 'Fetched networths successfully.',
            'networths' => $networths,
            'success' => true
        ]);
    }
}
