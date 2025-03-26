import { useState, useEffect } from "react";
import { MdDashboard, MdAccountBalanceWallet, MdMenu } from "react-icons/md";
import { FaMoneyBillWave, FaCalculator } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import CalculatorModal from "./CalculatorModal";

const Nav = ({ icon: Icon, title, onClick }) => {
  const path = "/" + title.toLowerCase();
  const location = useLocation();

  return (
    <Link
      className={`flex items-center gap-2 font-medium p-2 rounded-sm cursor-pointer transition ${
        path === location.pathname
          ? "bg-blue-500 text-white"
          : "text-blue-500 hover:bg-blue-100"
      }`}
      to={path}
      onClick={onClick}
    >
      <Icon className="text-lg" />
      <span>{title}</span>
    </Link>
  );
};

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth >= 768);

  const handleResize = () => {
    setIsMenuOpen(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="md:row-span-12 col-span-12 md:col-span-2 p-6 shadow-md flex flex-col gap-8 bg-white">
      <div className="flex items-center justify-between md:justify-center">
        <span className="text-blue-500 text-2xl font-medium">Ledger Web</span>
        <MdMenu
          className="block md:hidden text-3xl text-blue-500 cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />
      </div>
      <hr className="border-gray-300 border-1 rounded-full hidden md:block" />

      <motion.div
        className={`flex-1 flex-col gap-4 md:flex ${
          isMenuOpen ? "flex" : "hidden"
        } md:static absolute top-16 left-0 right-0 bg-white shadow-md md:shadow-none p-4 z-[100] md:p-0`}
        initial="hidden"
        animate={isMenuOpen ? "visible" : "hidden"}
        variants={menuVariants}
      >
        {["Dashboard", "Accounts", "Balances", "Transactions"].map(
          (title, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Nav
                icon={
                  title === "Dashboard"
                    ? MdDashboard
                    : title === "Accounts"
                    ? MdAccountBalanceWallet
                    : title === "Balances"
                    ? FaMoneyBillWave
                    : GrTransaction
                }
                title={title}
                onClick={handleResize}
              />
            </motion.div>
          )
        )}
      </motion.div>

      <div className="hidden md:flex justify-end">
        <FaCalculator
          className="text-2xl text-blue-500 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {isModalOpen && (
        <CalculatorModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <motion.div className="fixed w-15 h-15 bottom-16 right-8 md:hidden flex items-center justify-center">
        <FaCalculator
          className="text-6xl text-blue-500 cursor-pointer p-4 rounded-full bg-white shadow-md"
          onClick={() => setIsModalOpen(true)}
        />
      </motion.div>
    </div>
  );
};

export default Sidebar;
