import * as motion from "motion/react-client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NetWorthChart from "../components/NetWorthChart";

const Box = ({ balance, account }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center bg-blue-100 min-h-[125px] p-4  rounded-md"
    >
      <span className="text-blue-500 text-3xl font-bold">
        {balance || <Skeleton />}
      </span>
      <span>{account || <Skeleton />}</span>
    </motion.div>
  );
};

const Transaction = ({ accounts, balance, payee, date }) => {
  return (
    <div className="text-gray-500 bg-blue-50 p-4 rounded-lg">
      <span className="font-semibold text-lg block">
        {accounts || <Skeleton />}
      </span>
      <div className="flex items-center justify-between">
        <span className="text-3xl text-blue-500 font-medium">
          {balance || <Skeleton />}
        </span>
        <div className="text-right">
          <span className="block">{payee || <Skeleton />}</span>
          <span className="text-sm">{date || <Skeleton />}</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <SkeletonTheme
      width={100}
      baseColor="oklch(0.809 0.105 251.813)"
      highlightColor="oklch(0.882 0.059
      254.128)"
    >
      <div className="grid grid-cols-12 grid-rows-12 gap-4 h-full">
        {/* Balances */}
        <div className="col-span-12 row-span-4 grid grid-cols-4 gap-4 ">
          <Box />
          <Box />
          <Box />
          <Box />
        </div>
        {/* Transactions */}
        <motion.div
          className="bg-blue-100 col-span-4 row-span-8 p-5 flex flex-col gap-4 rounded-md overflow-auto"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <span className="text-2xl font-medium">Transactions</span>
          <div className="flex flex-col gap-2">
            <Transaction />
            <Transaction />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-blue-100 col-span-8 row-span-8 rounded-md flex flex-col gap-4 p-5"
        >
          <span className="text-2xl font-medium">Net Worth</span>
          <NetWorthChart />
        </motion.div>
      </div>
    </SkeletonTheme>
  );
};

export default Dashboard;
