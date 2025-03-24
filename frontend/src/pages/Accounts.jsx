import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import DataTable from "../components/DataTable";

const Accounts = () => {
  const rows = [
    { id: 1, account: "Assets:Cash", description: "Cash on hand" },
    { id: 2, account: "Assets:GCash", description: "GCash mobile wallet" },
    {
      id: 3,
      account: "Assets:Savings",
      description: "Savings account with BPI",
    },
    { id: 4, account: "Assets:DebitCard", description: "Debit card" },
    { id: 5, account: "Assets:CreditCard", description: "Credit card" },
    { id: 6, account: "Assets:Stocks", description: "Stocks" },
    { id: 7, account: "Assets:Bonds", description: "Bonds" },
    {
      id: 8,
      account: "Assets:MutualFund",
      description: "Mutual fund",
    },
    { id: 9, account: "Assets:RealEstate", description: "Real estate" },
    { id: 10, account: "Assets:Other", description: "Other assets" },
    {
      id: 11,
      account: "Liabilities:ShortTerm",
      description: "Short-term liabilities",
    },
    {
      id: 12,
      account: "Liabilities:LongTerm",
      description: "Long-term liabilities",
    },
    { id: 13, account: "Liabilities:CreditCard", description: "Credit card" },
  ];

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete clicked for ID:", id);
  };

  const columns = [
    {
      field: "account",
      headerName: "Account",
      headerClassName: "table-header",
      cellClassName: "table-cell",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      headerClassName: "table-header",
      cellClassName: "table-cell",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "table-header",
      cellClassName: "table-cell",
      width: 150,
      renderCell: (params) => (
        <div className="h-full flex items-center justify-center gap-2">
          <FaPen
            onClick={() => handleEdit(params.row.id)}
            className="text-blue-400"
          />
          <FaTrash
            onClick={() => handleDelete(params.row.id)}
            className="text-red-400"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="h-full grid-cols-12 grid-rows-12">
      <DataTable columns={columns} rows={rows} loading={false} />
    </div>
  );
};

export default Accounts;
