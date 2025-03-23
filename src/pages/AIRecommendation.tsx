import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const AIRecommendation: React.FC = () => {
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleGetRecommendations = async () => {
    if (!input) return alert("Please enter a description or genre");

    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      "http://localhost:4000/api/ai-recommend",
      { symptoms: input },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const formatted = data.recommendations
      .split("\n")
      .filter((line: string) => line.trim() !== "");

    setRecommendations(formatted);
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
            suggestions—complete with links to trailers or where to watch.
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
            placeholder="Describe a movie vibe or genre (e.g., dark sci-fi, 90s rom-com)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
            sx={{
              mb: 2,
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#1e1e1e",
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
              mb: 2,
            }}
            fullWidth
            onClick={handleGetRecommendations}
          >
            Recommend Movies
          </Button>

          {recommendations.length > 0 && (
            <Paper
              elevation={3}
              sx={{
                mt: 3,
                p: 3,
                backgroundColor: "#1e1e1e",
                borderRadius: "10px",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#F44336", mb: 2 }}
              >
                Your Movie Picks:
              </Typography>
              <List>
                {recommendations.map((line, index) => {
                  const linkMatch = line.match(
                    /\[Watch Here\]\((https?:\/\/[^\s]+)\)/
                  );

                  if (linkMatch) {
                    const movieTitleMatch =
                      recommendations[index - 1]?.match(/\*\*(.*?)\*\*/);
                    const movieTitle = movieTitleMatch
                      ? movieTitleMatch[1]
                      : "IMDb Link";

                    return (
                      <ListItem key={index} sx={{ pb: 1 }}>
                        <ListItemText
                          primary={
                            <Typography variant="body1">
                              <strong style={{ color: "#F44336" }}>Movie Link:</strong>{" "}
                              <a
                                href={linkMatch[1]}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#F44336", fontWeight: "bold" }}
                              >
                                {movieTitle}
                              </a>
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  }

                  return (
                    <ListItem key={index}>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ color: "#eee" }}>
                            {line}
                          </Typography>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default AIRecommendation;
