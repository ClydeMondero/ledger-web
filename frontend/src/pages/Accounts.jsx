import React, { useState, useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import DataTable from "../components/DataTable";
import { useModalStore } from "../store/FormModalStore";
import {
  getAccounts,
  postAccount,
  putAccount,
} from "../services/accountService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Accounts = () => {
  const { rowId, openModal } = useModalStore();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
  });

  const createMutation = useMutation({
    mutationFn: postAccount,
    onSuccess: () => {
      // console.log("Account successfully added.");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      console.error("Error creating account: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: putAccount,
    onSuccess: () => {
      // console.log("Account successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      console.error("Error creating account: " + error.message);
    },
  });

  const addAccountFields = [
    {
      name: "name",
      label: "Account Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
    },
    {
      name: "balance",
      label: "Balance",
      type: "number",
      required: true,
    },
  ];
  const editAccountFields = [
    {
      name: "name",
      label: "Account Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
    },
  ];

  const handleEdit = (id) => {
    openModal(id);
  };

  const columns = [
    {
      field: "name",
      headerName: "Account",
      headerClassName: "table-header",
      cellClassName: "table-cell",
      flex: 1,
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

  return (
    <div className="h-full grid-cols-12 grid-rows-12">
      <DataTable
        columns={columns}
        rows={data?.accounts || []}
        fields={rowId ? editAccountFields : addAccountFields}
        loading={isLoading}
        search
        button
        createMutation={createMutation}
        updateMutation={updateMutation}
      />
    </div>
  );
};

export default Accounts;
