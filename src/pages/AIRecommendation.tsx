import React, { useState } from "react";
import axios from "axios";
import apiClient from "../services/api-client";

import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Box,
  Grid,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const AIRecommendation: React.FC = () => {
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState<
    { name: string; description: string; image: string }[]
  >([]);

  const handleGetRecommendations = async () => {
    if (!input) return alert("Please enter a description or genre");

    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/ai-recommend",
        { symptoms: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.recommendations || !Array.isArray(data.recommendations)) {
        alert("Failed to get recommendations. Try again.");
        return;
      }

      setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url('/backround.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "#fff",
        minHeight: "100vh",
        py: 4,
      }}
    >
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

      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        sx={{
          color: "#F44336",
          mb: 4,
          fontFamily: "CustomMovieFont, sans-serif",
        }}
      >
        AI Movie Picks 🎥
        AI Movie Picks 🎥
      </Typography>

      <Container maxWidth="md">
        <Card
          sx={{
            p: 4,
            backgroundColor: "rgba(44, 44, 44, 0.95)",
            borderRadius: "16px",
            mb: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#F44336", mb: 1 }}
          >
            How It Works
          </Typography>
          <Typography variant="body1" sx={{ color: "#ccc" }}>
            Want a movie that matches your mood or favorite genre? Tell our AI
            what you're into (e.g. "thrilling action with plot twists" or
            "romantic comedy with smart dialogue") and get personalized movie
            suggestions—complete with images and insights.
          </Typography>
        </Card>

        <Card
          sx={{
            p: 4,
            backgroundColor: "rgba(44, 44, 44, 0.95)",
            borderRadius: "16px",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 3, color: "#F44336" }}
          >
            Get Movie Suggestions
          </Typography>

          <TextField
            fullWidth
            placeholder={`What movie genre are you looking for?
How many recommendations would you like? (e.g., dark sci-fi, comedy...)
The minimum number of recommendations is 2 and the maximum is 5.`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
            multiline
            rows={3}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#1e1e1e",
                "& fieldset": {
                  borderColor: "#444",
                },
                "&:hover fieldset": {
                  borderColor: "#666",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#888",
                },
              },
              "& .MuiInputBase-inputMultiline": {
                color: "#fff",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#aaa",
                opacity: 1,
              },
            }}
          />

          <Button
            variant="contained"
            startIcon={<Search />}
            sx={{
              bgcolor: "#F44336",
              color: "#fff",
              "&:hover": { bgcolor: "#c62828" },
              mb: 4,
            }}
            fullWidth
            onClick={handleGetRecommendations}
          >
            Recommend Movies
          </Button>

          {recommendations.length > 0 && (
            <>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 2, color: "#F44336" }}
              >
                Your Movie Picks:
              </Typography>
              <Grid container spacing={2}>
                {recommendations.map((rec, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card
                      sx={{
                        backgroundColor: "#2c2c2c",
                        color: "#fff",
                        borderRadius: "12px",
                        p: 2,
                      }}
                    >
                   <Box
                    sx={{
                      width: "100%",
                      height: "360px", 
                      backgroundColor: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={rec.image}
                      alt={rec.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x450?text=No+Image";
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain", // show full image without cropping
                      }}
                    />
                  </Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        mt={2}
                        gutterBottom
                      >
                        {rec.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#ccc" }}>
                        {rec.description}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default AIRecommendation;
