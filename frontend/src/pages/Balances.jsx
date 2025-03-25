import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import DataTable from "../components/DataTable";
import formatMoney from "../utilities/formatMoney";

const Balances = () => {
  const rows = [
    { id: 1, account: "Assets:Cash", balance: 1000 },
    { id: 2, account: "Assets:GCash", balance: 500 },
    { id: 3, account: "Assets:Savings", balance: 15000 },
    { id: 4, account: "Assets:DebitCard", balance: 2000 },
    { id: 5, account: "Assets:CreditCard", balance: -1000 },
    { id: 6, account: "Assets:Stocks", balance: 8000 },
    { id: 7, account: "Assets:Bonds", balance: 6000 },
    { id: 8, account: "Assets:MutualFund", balance: 12000 },
    { id: 9, account: "Assets:RealEstate", balance: 250000 },
    { id: 10, account: "Assets:Other", balance: 3000 },
    { id: 11, account: "Liabilities:ShortTerm", balance: -500 },
    { id: 12, account: "Liabilities:LongTerm", balance: -20000 },
    { id: 13, account: "Liabilities:CreditCard", balance: -1500 },
  ];

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
  };

  const columns = [
    {
      field: "account",
      headerName: "Account",
      headerClassName: "table-header",
      cellClassName: "table-cell",
      flex: 1,
    },
    {
      field: "balance",
      headerName: "Balance",
      headerClassName: "table-header",
      cellClassName: "table-cell",
      flex: 1,
      valueFormatter: (value) => {
        return formatMoney(value);
      },
    },
  ];

  return (
    <div className="h-full grid-cols-12 grid-rows-12">
      <DataTable
        columns={columns}
        rows={rows}
        loading={false}
        search
        sum="balance"
      />
    </div>
  );
};

export default Balances;
