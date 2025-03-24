import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaPlusCircle } from "react-icons/fa";
import * as motion from "motion/react-client";

export default function DataTable({ rows, columns, loading }) {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);

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

  return (
    <div className="row-span-12 flex flex-col gap-4">
      {/* Search Input */}
      <motion.div
        className="grid grid-cols-12 gap-4"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          className="col-span-8 py-3 px-6 border-2 border-blue-100 bg-blue-50 rounded-lg focus:outline-0"
        />
        <button
          type="button"
          className="col-span-4 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={() => console.log("Add button clicked")}
        >
          <FaPlusCircle />
          ADD
        </button>
      </motion.div>
      <DataGrid
        rows={filteredRows}
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "skeleton",
          },
        }}
        columns={columns}
        disableRowSelectionOnClick
        getRowClassName={(params) => `table-row`}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        sx={{
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#DBEAFE",
          },
        }}
      />
    </div>
  );
}
