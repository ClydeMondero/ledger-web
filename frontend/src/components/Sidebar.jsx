import { MdDashboard, MdAccountBalanceWallet } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";

const Nav = ({ icon: Icon, title }) => {
  const path = "/" + title.toLowerCase();
  const location = useLocation();

  return (
    <Link
      className={`flex items-center gap-2 font-medium ${
        path == location.pathname
          ? "bg-blue-500 text-white"
          : "text-blue-500 hover:bg-blue-100"
      } p-2 rounded-sm cursor-pointer transition `}
      to={path}
    >
      <Icon className="text-lg" />
      <span>{title}</span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="h-full w-60 p-6 shadow-md flex flex-col gap-8">
      <span className="text-blue-500 text-2xl font-medium text-center">
        Ledger Web
      </span>
      <hr className="border-gray-300 border-1 rounded-full" />
      <div className="flex flex-col gap-4">
        <Nav icon={MdDashboard} title="Dashboard" />
        <Nav icon={MdAccountBalanceWallet} title="Accounts" />
        <Nav icon={FaMoneyBillWave} title="Balances" />
        <Nav icon={GrTransaction} title="Transactions" />
      </div>
    </div>
  );
};

export default Sidebar;
