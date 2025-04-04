import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaArrowRight, FaPen, FaPlusCircle } from "react-icons/fa";
import * as motion from "motion/react-client";
import formatMoney from "../utilities/formatMoney";
import FormModal from "./FormModal";
import { useMediaQuery } from "@mui/material";
import Cards from "./Cards";
import { useModalStore } from "../store/FormModalStore";

export default function DataTable({
  rows,
  columns,
  loading,
  search = false,
  button = false,
  sum,
  fields,
  createMutation,
  updateMutation,
}) {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const [total, setTotal] = useState(0);
  const [modalData, setModalData] = useState(null);
  const { isModalOpen, rowId, openModal, closeModal } = useModalStore();

  const isMediumScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  useEffect(() => {
    const total = filteredRows.reduce((acc, row) => acc + row[sum], 0);
    setTotal(total);
  }, [filteredRows]);

  useEffect(() => {
    const rowData = filteredRows.find((row) => row.id == rowId);
    setModalData(rowData || null);
  }, [rowId]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filteredData = rows.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );
    setFilteredRows(filteredData);
  };

  const handleAddClick = () => {
    openModal();
  };

  const handleEdit = (id) => {
    openModal(id);
  };

  return (
    <div className="row-span-12 flex flex-col gap-4">
      {/* Search Input */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {search ? (
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            className={`flex-2 py-3 px-6 border-2 border-blue-100 bg-blue-50 rounded-lg focus:outline-0`}
          />
        ) : (
          <div className="col-span-12"></div>
        )}
        {button && (
          <button
            type="button"
            className={`flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg`}
            onClick={handleAddClick}
          >
            <FaPlusCircle />
            NEW
          </button>
        )}
        {sum && (
          <span className="col-span-12 text-l text-right text-blue-500 font-medium md:hidden">
            Total: {formatMoney(total)}
          </span>
        )}
      </motion.div>

      {/* Display Cards on Medium Screens */}
      {isMediumScreen ? (
        <Cards
          filteredRows={filteredRows}
          columns={columns}
          handleEdit={handleEdit}
        />
      ) : (
        // DataGrid for Larger Screens
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <DataGrid
            rows={filteredRows}
            loading={loading}
            columns={columns}
            disableRowSelectionOnClick
            getRowClassName={() => `table-row`}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 6, page: 0 },
              },
            }}
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#DBEAFE",
              },
              "& .MuiDataGrid-cell:focus": {
                border: "none",
                outline: "none",
              },
            }}
          />
          {sum && (
            <span className="absolute bottom-[1rem] left-4 text-sm text-blue-500 font-medium">
              Total: {formatMoney(total)}
            </span>
          )}
        </motion.div>
      )}

      {fields && (
        <FormModal
          open={isModalOpen}
          onClose={() => {
            closeModal();
          }}
          fields={fields}
          modalData={modalData}
          createMutation={createMutation}
          updateMutation={updateMutation}
        />
      )}
    </div>
  );
}
