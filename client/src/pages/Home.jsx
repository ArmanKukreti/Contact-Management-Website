import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import CloudIcon from "@mui/icons-material/Cloud";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: "100vh",
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), #e3f2fd)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#1a237e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 2,
        }}
      >
        <Container>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            Welcome to <span style={{ color: "#4CAF50" }}>ContactBook</span>
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: 4 }}>
            A modern way to organize and secure your contacts.
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="large"
            component={Link}
            sx={{
              fontWeight: "bold",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              borderRadius: "25px",
              padding: "10px 30px",
              "&:hover": {
                transform: "scale(1.05)",
                transition: "0.3s",
              },
            }}
            to="/register"
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ marginTop: 8, marginBottom: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose <span id="about" style={{ color: "#4CAF50" }}>ContactBook?</span>
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: 4, color: "#555" }}>
          Discover how ContactBook simplifies organizing your contacts.
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: <TouchAppIcon fontSize="large" color="success" />,
              title: "Simple to Use",
              description: "An intuitive interface for managing contacts effectively.",
            },
            {
              icon: <SecurityIcon fontSize="large" color="success" />,
              title: "Secure & Reliable",
              description: "Your data is encrypted with industry-leading practices.",
            },
            {
              icon: <CloudIcon fontSize="large" color="success" />,
              title: "Cloud Access",
              description: "Access your contacts anytime, from any device.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                  padding: 3,
                  backgroundColor: "#e8eaf6",
                  color: "#1a237e",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" align="center" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" align="center" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ background: "#f3f4f6", padding: 4, textAlign: "center" }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            What Our Users Say
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4, color: "#555" }}>
            Join thousands of satisfied users who trust ContactBook for their contact management.
          </Typography>
          <Grid container spacing={4}>
            {[
              "Effortless and secure contact management!",
              "Great for accessing contacts on the go!",
              "ContactBook has saved me so much time!",
            ].map((quote, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ padding: 3, backgroundColor: "#e3f2fd", color: "#1a237e" }}>
                  <CardContent>
                    <Typography variant="body1" align="center" color="text.secondary">
                      "{quote}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ background: "#1a237e", color: "#fff", padding: 2, textAlign: "center" }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} ContactBook. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          <a href="/privacy-policy" style={{ color: "#BBDEFB", textDecoration: "none" }}>
            Privacy Policy
          </a> |{" "}
          <a href="/terms" style={{ color: "#BBDEFB", textDecoration: "none" }}>
            Terms of Service
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
