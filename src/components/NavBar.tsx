import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
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

      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "rgba(44,44,44,0.95)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          fontFamily: "CustomMovieFont, sans-serif",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              display="flex"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            >
              <Box
                component="img"
                src="/Logo.png"
                alt="Movie Club Logo"
                sx={{ height: 100, width: "auto", mr: 1 }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  color: "#F44336",
                  "&:hover": { opacity: 0.8 },
                  transition: "0.3s ease",
                  fontFamily: "CustomMovieFont, sans-serif",
                }}
              >
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Button
                color="inherit"
                sx={{ fontSize: "16px", textTransform: "none", color: "#fff", fontFamily: "CustomMovieFont, sans-serif" }}
                onClick={() => navigate("/dashboard")}
              >
                Home
              </Button>
              <Button
                color="inherit"
                sx={{ fontSize: "16px", textTransform: "none", color: "#fff", fontFamily: "CustomMovieFont, sans-serif" }}
                onClick={() => navigate("/forum")}
              >
                Club
              </Button>
              <Button
                color="inherit"
                sx={{ fontSize: "16px", textTransform: "none", color: "#fff", fontFamily: "CustomMovieFont, sans-serif" }}
                onClick={() => navigate("/ai-recommend")}
              >
                AI Picks
              </Button>
              <Button
                color="inherit"
                sx={{ fontSize: "16px", textTransform: "none", color: "#fff", fontFamily: "CustomMovieFont, sans-serif" }}
                onClick={() => navigate("/about")}
              >
                About Us
              </Button>
              <Button
                color="inherit"
                sx={{ fontSize: "16px", textTransform: "none", color: "#fff", fontFamily: "CustomMovieFont, sans-serif" }}
                onClick={() => navigate("/profile")}
              >
              My Profile
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  bgcolor: "#F44336",
                  color: "#fff",
                  fontFamily: "CustomMovieFont, sans-serif",
                  "&:hover": { bgcolor: "#c62828" },
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
