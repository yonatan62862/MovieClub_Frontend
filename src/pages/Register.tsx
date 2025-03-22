import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Divider,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddPhotoAlternate } from "@mui/icons-material";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("/default-avatar.png"); // Default avatar
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show image preview
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      await axios.post("http://localhost:4000/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/login");
    } catch (error) {
      alert("Registration failed.");
    }
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
            Create Your Account
          </Typography>

          {/* 🔹 Profile Picture Upload */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Avatar
              src={previewImage}
              sx={{ width: 100, height: 100, mb: 1, bgcolor: "#F44336" }}
            />
            <IconButton component="label">
              <AddPhotoAlternate sx={{ color: "#F44336" }} />
              <input type="file" hidden onChange={handleImageChange} />
            </IconButton>
            <Typography variant="caption" color="#ccc">
              Upload Profile Picture
            </Typography>
          </Box>

          {/* 🔹 Register Form */}
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                bgcolor: "#F44336",
                "&:hover": { bgcolor: "#c62828" },
                fontFamily: "CustomMovieFont, sans-serif",
              }}
            >
              Register
            </Button>
          </form>

          {/* 🔹 Divider */}
          <Divider sx={{ my: 3, color: "#fff" }} />

          {/* 🔹 Login Navigation */}
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Already have an account?
          </Typography>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate("/login")}
            sx={{ color: "#F44336", fontWeight: "bold" }}
          >
            Login Here
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;