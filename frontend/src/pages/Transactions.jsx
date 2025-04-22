import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import DataTable from "../components/DataTable";
import formatMoney from "../utilities/formatMoney";
import { formatDate, formatToMMDDYYYY } from "../utilities/formatDate";
import { useModalStore } from "../store/FormModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccountsOptions } from "../services/accountService";
import {
  getTransactions,
  postTransaction,
  putTransaction,
} from "../services/transactionService";
import { toast } from "react-toastify";

const Transactions = () => {
  const { openModal, togglePending } = useModalStore();
  const queryClient = useQueryClient();

  const handleEdit = (id) => {
    openModal(id);
  };

  const { data: accountOptionData } = useQuery({
    queryKey: ["accountOptions"],
    queryFn: getAccountsOptions,
  });

  const { data: transactionData, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const createMutation = useMutation({
    mutationFn: postTransaction,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      togglePending();
      toast.success(response.message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;

      togglePending();
      toast.error(errorMessage);

      console.error("Error creating transaction: " + errorMessage);
    },
  });

  const updateMutation = useMutation({
    mutationFn: putTransaction,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      togglePending();
      toast.success(response.message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;

      togglePending();
      toast.error(errorMessage);

      console.error("Error updating transaction: " + errorMessage);
    },
  });

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
      field: "from_account",
      headerName: "From Account",
      headerClassName: "table-header",
      cellClassName: "table-cell",
      flex: 1,
    },
    {
      field: "to_account",
      headerName: "To Account",
      headerClassName: "table-header",
      cellClassName: "table-cell",
      flex: 1,
    },
    {
      field: "created_at",
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
      flex: 1,
      renderCell: (params) => (
        <div className="h-full flex items-center justify-center gap-2">
          <FaPen
            onClick={() => handleEdit(params.row.id)}
            className="text-blue-400"
          />
        </div>
      ),
    },
  ];

  const transactionFields = [
    {
      name: "payee",
      label: "Payee",
      type: "text",
      required: true,
    },
    {
      name: "balance",
      label: "Balance",
      type: "text",
      required: true,
    },
    {
      name: "from_account",
      label: "From Account",
      type: "select",
      required: true,
      options: accountOptionData?.accounts || [],
    },
    {
      name: "to_account",
      label: "To Account",
      type: "select",
      required: true,
      options: accountOptionData?.accounts || [],
    },
  ];

  return (
    <div className="h-full grid-cols-12 grid-rows-12">
      <DataTable
        columns={columns}
        rows={transactionData?.transactions || []}
        fields={transactionFields}
        loading={false}
        search
        button
        createMutation={createMutation}
        updateMutation={updateMutation}
      />
    </div>
  );
};

export default Transactions;
