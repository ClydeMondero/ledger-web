import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import DataTable from "../components/DataTable";
import formatMoney from "../utilities/formatMoney";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getAccounts } from "../services/accountService";

const Balances = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
  });

  const columns = [
    {
      field: "name",
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
        rows={data?.accounts || []}
        loading={isLoading}
        search
        sum="balance"
      />
    </div>
  );
};

export default Balances;
