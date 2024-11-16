import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  Box,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { UserContext } from "../context/userContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setCurrentUser } = useContext(UserContext);

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return; // Prevent submission if validation fails

    try {
      const response = await axios.post("/api/user/login", formData);
      const newUser = await response.data;

      if (newUser) {
        setCurrentUser(newUser);
        console.log("User logged in:", newUser);
        navigate("/dashboard"); // Navigate to the dashboard
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        console.log(error.response.data.error);
      } else {
        setError("An error occurred while logging in. Please try again later.");
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: "40px 30px",
          width: "400px",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Avatar
          sx={{
            backgroundColor: "#1976d2",
            width: 64,
            height: 64,
            margin: "0 auto",
          }}
        >
          <ImportContactsIcon fontSize="large" />
        </Avatar>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 3 }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ color: "#757575", mb: 3 }}>
          Log in to continue to your account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 2 }}>
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              placeholder="Enter your email"
              fullWidth
              required
              margin="normal"
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={handleChange}
              value={formData.email}
            />
            <TextField
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              fullWidth
              required
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={handleChange}
              value={formData.password}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                textTransform: "capitalize",
                fontSize: "1rem",
                fontWeight: "bold",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              Log In
            </Button>
          </Box>

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

          <Typography
            sx={{
              mt: 3,
              color: "#1976d2",
              fontSize: "0.9rem",
              textAlign: "right",
            }}
          >
            <Link href="#" underline="hover">
              Forgot password?
            </Link>
          </Typography>

          <Typography sx={{ mt: 3, fontSize: "0.9rem" }}>
            Don’t have an account?{" "}
            <Link href="/register" underline="hover" sx={{ fontWeight: "bold" }}>
              Register
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
