import React, { useRef, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null); 

  useEffect(() => {
    if (videoRef.current) {
      // Set the video start time to 20 seconds
      videoRef.current.currentTime = 20;

      // Enable autoplay with sound (requires user interaction on some browsers)
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  }, []);

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

      <Box
        sx={{
          fontFamily: "CustomMovieFont, sans-serif", 
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url('/backround.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          p: 3,
        }}
      >
        <Container maxWidth="lg">
          <Card
            sx={{
              p: 5,
              textAlign: "center",
              backgroundColor: "rgba(20, 20, 20, 0.95)",
              color: "#fff",
              borderRadius: "20px",
              boxShadow: "0 8px 20px rgba(244, 67, 54, 0.4)", 
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                color: "#F44336",
                fontFamily: "CustomMovieFont, sans-serif", 
                letterSpacing: 2,
                mb: 2,
              }}
            >
               Movie Club 🎬
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#ccc",
                maxWidth: 700,
                mx: "auto",
                mb: 4,
                fontFamily: "CustomMovieFont, sans-serif", 
              }}
            >
              Dive into a world of cinema. Join our community to share reviews,
              discover new favorites, and explore AI-powered movie picks.
            </Typography>

            <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#EF5350",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#E53935" },
                  fontFamily: "CustomMovieFont, sans-serif", 
                }}
                onClick={() => navigate("/forum")}
              >
                Join the club 🍿
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#F44336",
                  color: "#F44336",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#1a1a1a",
                    borderColor: "#F44336",
                  },
                  fontFamily: "CustomMovieFont, sans-serif", 
                }}
                onClick={() => navigate("/ai-recommend")}
              >
                AI Recommends 🎬
              </Button>
            </Box>
          </Card>

          <Box
            sx={{
              mt: 6,
              textAlign: "center",
              borderRadius: "20px",
              overflow: "hidden", 
              boxShadow: "0 8px 20px rgba(244, 67, 54, 0.4)", 
            }}
          >
            <video
              ref={videoRef} 
              controls
              muted={false} 
              loop
              style={{
                width: "100%",
                maxWidth: "800px",
                borderRadius: "20px",
              }}
            >
              <source src="/movie-trailer.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;