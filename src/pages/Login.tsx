import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Divider,
  Box,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `linear-gradient(rgba(210, 201, 201, 0.9), rgba(0,0,0,0.9)), url('/backround.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        py: 6,
        fontFamily: "CustomMovieFont, sans-serif",
      }}
    >
      {/* 🔤 Load Custom Font */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'CustomMovieFont';
              src: url('/fonts/font.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
          `,
        }}
      />

      <Container maxWidth="xs">
        <Card
          sx={{
            mt: 4,
            p: 4,
            textAlign: "center",
            borderRadius: "16px",
            backgroundColor: "rgba(44,44,44,0.95)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* 🔹 Logo */}
          <Box
            component="img"
            src="/Logo.png"
            alt="Movie Club Logo"
            sx={{ width: 180, height: "auto", mx: "auto", mb: 2 }}
          />

          <Typography
            variant="h5"
            fontWeight="bold"
            color="#F44336"
            sx={{ mb: 3, fontFamily: "CustomMovieFont, sans-serif" }}
          >
            Welcome to Movie Club
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                input: { color: "#fff" },
                label: { color: "#ccc" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#1e1e1e",
                  "& fieldset": {
                    borderColor: "#ccc", // Add border color for better visibility
                  },
                  "&:hover fieldset": {
                    borderColor: "#F44336", // Highlight border on hover
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3,
                input: { color: "#fff" },
                label: { color: "#ccc" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#1e1e1e",
                  "& fieldset": {
                    borderColor: "#ccc", // Add border color for better visibility
                  },
                  "&:hover fieldset": {
                    borderColor: "#F44336", // Highlight border on hover
                  },
                },
              }}
            />
            <Button
              variant="contained" // Fixed typo here
              fullWidth
              type="submit"
              sx={{
                bgcolor: "#F44336",
                "&:hover": { bgcolor: "#c62828" },
                fontFamily: "CustomMovieFont, sans-serif",
              }}
            >
              Login
            </Button>
          </form>

          <Divider sx={{ my: 3, color: "#fff" }}>or</Divider>

          <Button
            variant="contained"
            fullWidth
            startIcon={<Google />}
            onClick={handleGoogleLogin}
            sx={{ bgcolor: "#fff", color: "#F44336", "&:hover": { bgcolor: "#E9ECEF" } }}
          >
            Login with Google
          </Button>

          <Typography variant="body2" sx={{ mt: 3, color: "#fff" }}>
            Don't have an account?
          </Typography>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate("/register")}
            sx={{ color: "#F44336", fontWeight: "bold" }}
          >
            Register Now
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;