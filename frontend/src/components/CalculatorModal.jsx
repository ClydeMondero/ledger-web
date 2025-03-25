import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

const CalculatorModal = ({ onClose, open }) => {
  const [count, setCount] = useState("");

  const handleDivClick = (event) => {
    const numberInDiv = event.target.textContent;
    setCount((prevInputValue) => prevInputValue + numberInDiv);
  };

  function equals() {
    try {
      setCount(eval(count.replace("x", "*")).toString());
    } catch (error) {
      setCount("Error");
    }
  }

  function reset() {
    setCount("");
  }

  function del() {
    setCount(count.slice(0, -1));
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#EFF6FF",
          boxShadow: 24,
          p: 2,
          borderRadius: 1,
          width: "100%",
          maxWidth: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ":focus": { outline: "none" },
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            color: "#1e3a8a",
            textAlign: "right",
            fontSize: "1.5rem",
            p: 1,
            borderRadius: 1,
            mb: 2,
            overflow: "hidden",
            height: 48,
            width: "100%",
          }}
        >
          {count || 0}
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1}>
          {[
            "7",
            "8",
            "9",
            "DEL",
            "4",
            "5",
            "6",
            "+",
            "1",
            "2",
            "3",
            "-",
            ".",
            "0",
            "/",
            "*",
          ].map((item) => {
            const operatorColors = {
              "+": "#2B7FFF",
              "-": "#2B7FFF",
              "*": "#2B7FFF",
              "/": "#2B7FFF",
            };
            return (
              <Button
                key={item}
                variant="contained"
                color={item === "DEL" ? "error" : "primary"}
                sx={{
                  p: 1,
                  fontSize: "1rem",
                  width: "100%",
                  bgcolor: operatorColors[item] || "#fff",
                  color: operatorColors[item] ? "white" : "#1e3a8a",
                  "&:hover": {
                    bgcolor: operatorColors[item] ? "#2B7FFF" : "#F8F9FA",
                  },
                }}
                onClick={item === "DEL" ? del : handleDivClick}
              >
                {item}
              </Button>
            );
          })}

          <Button
            variant="contained"
            onClick={reset}
            sx={{
              gridColumn: "span 2",
              p: 1,
              fontSize: "1rem",
              width: "100%",
              bgcolor: "#fff",
              color: "#1e3a8a",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            RESET
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={equals}
            sx={{
              gridColumn: "span 2",
              p: 1,
              fontSize: "1rem",
              width: "100%",
              bgcolor: "#fff",
              color: "#1e3a8a",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            =
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CalculatorModal;
