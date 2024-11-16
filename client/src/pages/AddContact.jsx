import { Button, Box, Paper, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import CustomModal from "../components/CustomModal";
import axios from "axios";

const AddContact = ({ popup, closePopup }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.company) newErrors.company = "Company is required";
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title number is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    try {
      const response = await axios.post("/api/contact/create", formData);
      const newContact = await response.data;

      if (newContact) {
        window.location.reload();
        console.log("New user registered:", newContact);
      } else {
        setError("Couldn't add contact. Please try again.");
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError(
          "An error occurred while creating contact. Please try again later."
        );
      }
    }
  };

  return (
    <CustomModal open={popup} onClose={closePopup} cross={true}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 500 }}>
          <Typography variant="h5" gutterBottom align="center">
            Add contact
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                fullWidth
                required
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                fullWidth
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                fullWidth
                required
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
                fullWidth
                required
              />
              <TextField
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                error={Boolean(errors.company)}
                helperText={errors.company}
                fullWidth
                required
              />
              <TextField
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                error={Boolean(errors.jobTitle)}
                helperText={errors.jobTitle}
                fullWidth
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                fullWidth
              >
                Add
              </Button>

              {error && (
              <Typography
                sx={{
                  mt: 2,
                  color: "red",
                  fontSize: "0.9rem",
                }}
              >
                {error}
              </Typography>
            )}
            </Box>
          </form>
        </Paper>
      </Box>
    </CustomModal>
  );
};

export default AddContact;
