import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaPlusCircle } from "react-icons/fa";
import * as motion from "motion/react-client";
import formatMoney from "../utilities/formatMoney";
import FormModal from "./FormModal";

export default function DataTable({
  rows,
  columns,
  loading,
  search = false,
  button = false,
  sum,
  fields,
}) {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const total = filteredRows.reduce((acc, row) => acc + row[sum], 0);
    setTotal(total);
  }, [filteredRows]);

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
    setIsModalOpen(true);
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
        {search ? (
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            className={`col-span-${
              button ? 8 : 12
            } py-3 px-6 border-2 border-blue-100 bg-blue-50 rounded-lg focus:outline-0`}
          />
        ) : (
          <div className="col-span-12"></div>
        )}
        {button && (
          <button
            type="button"
            className={`col-span-${
              search ? 4 : 12
            } flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg`}
            onClick={handleAddClick}
          >
            <FaPlusCircle />
            NEW
          </button>
        )}
      </motion.div>
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
          }}
        />
        {sum && (
          <span className="absolute bottom-[1rem] left-4 text-sm text-blue-500 font-medium">
            Total: {formatMoney(total)}
          </span>
        )}
      </motion.div>
      {fields && (
        <FormModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fields={fields}
        />
      )}
    </div>
  );
}
