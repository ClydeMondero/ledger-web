import * as motion from "motion/react-client";
import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NetWorthChart from "../components/NetWorthChart";
import { useQuery } from "@tanstack/react-query";
import {
  getBalances,
  getNetworths,
  getTransactions,
} from "../services/transactionService";
import { formatDate, formatToMonthYear } from "../utilities/formatDate";
import formatMoney from "../utilities/formatMoney";

const Box = ({ balance, account }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center bg-blue-100 min-h-[125px] p-4  rounded-md"
    >
      <span className="text-blue-500 text-3xl font-bold">
        {formatMoney(balance) || <Skeleton />}
      </span>
      <span className="text-gray-500">{account || <Skeleton />}</span>
    </motion.div>
  );
};

const BoxSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center bg-blue-100 min-h-[125px] p-4  rounded-md"
    >
      <span className="text-blue-500 text-3xl font-bold">
        <Skeleton />
      </span>
      <span>
        <Skeleton />
      </span>
    </motion.div>
  );
};

const Transaction = ({ from_account, to_account, balance, payee, date }) => {
  return (
    <div className="text-gray-500 bg-blue-50 p-4 rounded-lg">
      <span className="font-semibold text-sm block">
        {from_account + " to " + to_account}
      </span>
      <div className="flex items-center justify-between">
        <span className="text-3xl text-blue-500 font-medium">
          {formatMoney(balance)}
        </span>
        <div className="text-right">
          <span className="block">{payee}</span>
          <span className="text-sm">{formatDate(date) + " ago"}</span>
        </div>
      </div>
    </div>
  );
};

const TransactionSkeleton = () => {
  return (
    <div className="text-gray-500 bg-blue-50 p-4 rounded-lg">
      <span className="font-semibold text-sm block">
        <Skeleton />
      </span>
      <div className="flex items-center justify-between">
        <span className="text-3xl text-blue-500 font-medium">
          <Skeleton />
        </span>
        <div className="text-right">
          <span className="block">
            <Skeleton />
          </span>
          <span className="text-sm">
            <Skeleton />
          </span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { data: transactionData, isLoading: isLoadingTransaction } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const { data: netWorthData } = useQuery({
    queryKey: ["networths"],
    queryFn: getNetworths,
  });

  const { data: balancesData, isLoading: isLoadingBalances } = useQuery({
    queryKey: ["balances"],
    queryFn: getBalances,
  });

  return (
    <SkeletonTheme
      width={100}
      baseColor="oklch(0.809 0.105 251.813)"
      highlightColor="oklch(0.882 0.059
      254.128)"
    >
      <div className="grid grid-cols-12 gap-4 h-full md:grid-rows-12">
        {/* Balances */}
        <div className="col-span-12 row-span-4 grid grid-cols-2 gap-4 order-2 md:order-1 md:grid-cols-4">
          {isLoadingBalances ? (
            <>
              <BoxSkeleton />
              <BoxSkeleton />
              <BoxSkeleton />
              <BoxSkeleton />
            </>
          ) : (
            Object.entries(balancesData?.balances || {}).map(
              ([account, balance], index) => (
                <Box key={index} balance={balance} account={account} />
              )
            )
          )}
        </div>
        {/* Transactions */}
        <motion.div
          className="bg-blue-100 col-span-12  p-5 flex flex-col gap-4 rounded-md overflow-auto md:col-span-4 order-3 md:row-span-8 md:order-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <span className="text-2xl font-medium">Transactions</span>
          <div className="flex flex-col gap-2">
            {isLoadingTransaction ? (
              <TransactionSkeleton />
            ) : (
              transactionData?.transactions
                ?.slice(0, 3)
                .map((transaction, index) => (
                  <Transaction
                    key={index}
                    from_account={transaction.from_account}
                    to_account={transaction.to_account}
                    balance={transaction.balance}
                    payee={transaction.payee}
                    date={transaction.created_at}
                  />
                ))
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-blue-100 col-span-12 rounded-md flex flex-col gap-4 p-5 order-1 md:order-3 md:col-span-8 md:row-span-8"
        >
          <span className="text-2xl font-medium">Net Worth</span>
          <NetWorthChart
            data={netWorthData?.networths.map((networth) => ({
              ...networth,
              date: formatToMonthYear(networth.date),
            }))}
          />
        </motion.div>
      </div>
    </SkeletonTheme>
  );
};

export default Dashboard;
