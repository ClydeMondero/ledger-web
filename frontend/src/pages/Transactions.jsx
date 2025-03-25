import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import DataTable from "../components/DataTable";
import formatMoney from "../utilities/formatMoney";
import { formatDate, formatToMMDDYYYY } from "../utilities/formatDate";

const Transactions = () => {
  const rows = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    payee: `Payee ${i + 1}`,
    balance: (i % 2 === 0 ? 1 : -1) * (i + 1) * 100,
    to_account: `To Account ${i + 1}`,
    from_account: `From Account ${i + 1}`,
  }));

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
  };

  const columns = [
    {
      field: "payee",
      headerName: "Payee",
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
    {
      field: "to_account",
      headerName: "To Account",
      headerClassName: "table-header",
      cellClassName: "table-cell",
      flex: 1,
    },
    {
      field: "from_account",
      headerName: "From Account",
      headerClassName: "table-header",
      cellClassName: "table-cell",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      headerClassName: "table-header",
      cellClassName: "table-cell",
      flex: 1,
      renderCell: (params) => {
        const formattedDate = formatToMMDDYYYY(params.value);
        const relativeDate = formatDate(params.value);
        return (
          <div className="flex gap-2">
            <span>{formattedDate}</span>
            <span className="text-gray-400">{relativeDate}</span>
          </div>
        );
      },
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
      <DataTable columns={columns} rows={rows} loading={false} search button />
    </div>
  );
};

export default Transactions;
