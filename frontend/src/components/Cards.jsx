import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPen, FaArrowRight } from "react-icons/fa";
import { Card, CardContent, Typography, Pagination } from "@mui/material";
import formatMoney from "../utilities/formatMoney";
import { formatDate } from "../utilities/formatDate";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Cards = ({ filteredRows, columns, handleEdit }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedRows = filteredRows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {paginatedRows.map((row, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#F7F7FA",
                borderRadius: 2,
                padding: 2,
                borderColor: "#E0E0E0",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  position: "relative",
                }}
              >
                {columns.map((col, i) =>
                  col.field === "actions" ? (
                    <div className="absolute top-0 right-0">
                      <button
                        key={col.field}
                        onClick={() => handleEdit(row.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        <FaPen />
                      </button>
                    </div>
                  ) : (
                    <Typography
                      key={col.field}
                      variant="body2"
                      sx={{
                        color:
                          col.field === "date"
                            ? "#757575"
                            : i === 0
                            ? "#2B7FFF"
                            : "#4B5563",
                        fontWeight: i === 0 ? "bold" : "normal",
                        fontSize: i === 0 ? "1.25rem" : "1rem",
                      }}
                    >
                      {col.field === "balance" ? (
                        formatMoney(row[col.field])
                      ) : col.field === "date" ? (
                        <span>{formatDate(row[col.field])} ago</span>
                      ) : col.field === "from_account" ? (
                        <div className="flex items-center gap-2">
                          <span>{row.from_account}</span>
                          <FaArrowRight className="text-blue-500 text-sm" />
                          <span>{row.to_account}</span>
                        </div>
                      ) : col.field === "to_account" ? (
                        ""
                      ) : (
                        row[col.field]
                      )}
                    </Typography>
                  )
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(filteredRows.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Cards;
