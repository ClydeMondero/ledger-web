import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

const FormModal = ({ open, onClose, fields }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setFormData({});
    onClose();
  };

  const handleClose = () => {
    setFormData({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 360,
          bgcolor: "#fff",
          p: 3,
          borderRadius: 2,
          ":focus": { outline: "none" },
        }}
      >
        <Typography variant="h6" component="h2" mb={2} color="#333">
          Add New Entry
        </Typography>
        <form onSubmit={handleSubmit}>
          {fields.map((field) =>
            field.type === "select" ? (
              <TextField
                key={field.name}
                select
                fullWidth
                label={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                margin="normal"
                required={field.required}
                variant="outlined"
                InputProps={{
                  sx: {
                    borderRadius: 2,
                  },
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflow: "auto",
                      },
                    },
                  },
                }}
              >
                {field.options.slice(0, 5).map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                key={field.name}
                fullWidth
                label={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                margin="normal"
                type={field.type}
                required={field.required}
                variant="outlined"
                InputProps={{
                  sx: {
                    borderRadius: 2,
                  },
                }}
              />
            )
          )}
          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: "#007bff",
                paddingX: 2,
                ":hover": { bgcolor: "#0056b3" },
                borderRadius: 2,
                boxShadow: 0,
              }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default FormModal;
