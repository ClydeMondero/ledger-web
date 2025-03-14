import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import capitalizeFirstLetter from "../utilities/capitalizeFirstLetter";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Accounts from "../pages/Accounts";
import Balances from "../pages/Balances";
import Transactions from "../pages/Transactions";

const Content = () => {
  const location = useLocation();
  const title = capitalizeFirstLetter(location.pathname.substring(1));

  const today = new Date().getFullYear();

  return (
    <div className="flex-1 flex flex-col gap-4">
      <motion.span
        className="text-4xl p-5"
        key={title} // Ensures animation runs on change
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {title}
      </motion.span>
      <div className="flex-1 p-5">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/balances" element={<Balances />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div className="w-full h-10 p-2 border-gray-200 border-t-2 text-gray-400 text-center">
        <span>© Ledger Web {today}</span>
      </div>
    </div>
  );
};

export default Content;
