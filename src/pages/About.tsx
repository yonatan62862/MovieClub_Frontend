import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Box,
} from "@mui/material";

const About: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url('/backround.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "#fff",
        minHeight: "100vh",
        py: 6,
        px: 2,
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

      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ mb: 4, color: "#F44336", fontFamily: "CustomMovieFont, sans-serif" }}
        >
          About Movie Club 🎥 
        </Typography>

        <Card
          sx={{
            p: 3,
            mb: 4,
            textAlign: "left",
            backgroundColor: "rgba(44,44,44,0.95)",
            borderRadius: "16px",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#F44336", fontFamily: "CustomMovieFont, sans-serif" }}
            >
              Our Passion 🎬
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 2, color: "#ccc", fontFamily: "CustomMovieFont, sans-serif" }}
            >
              We’re three developers who love movies — from cult horror classics
              to sci-fi thrillers and heartwarming comedies. Our mission is to
              build an engaging space for movie lovers to connect, share
              reviews, and get personalized film recommendations powered by AI.
            </Typography>
          </CardContent>
        </Card>

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#F44336", mb: 3, fontFamily: "CustomMovieFont, sans-serif" }}
        >
          Meet the Devs 👨‍💻👩‍💻👨‍💻
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* 🔹 Bar */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "rgba(33,33,33,0.95)",
                borderRadius: "16px",
              }}
            >
              <Avatar
                src="/images/bar.jpg"
                alt="Bar"
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#F44336", fontFamily: "CustomMovieFont, sans-serif" }}
              >
                Bar
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#ccc", mt: 1, fontFamily: "CustomMovieFont, sans-serif" }}
              >
              Romantic at heart,loves clever and feel-good comedies.
              </Typography>
              <Typography
                component="a"
                href="https://www.linkedin.com/in/bar-kobi/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  mt: 1,
                  display: "block",
                  color: "#2196f3",
                  textDecoration: "underline",
                  fontFamily: "CustomMovieFont, sans-serif",
                }}
              >
                LinkedIn
              </Typography>
            </Card>
          </Grid>

          {/* 🔹 Nitzan */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "rgba(33,33,33,0.95)",
                borderRadius: "16px",
              }}
            >
              <Avatar
                src="/images/nitzan.jpg"
                alt="Nitzan"
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#F44336", fontFamily: "CustomMovieFont, sans-serif" }}
              >
                Nitzan
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#ccc", mt: 1, fontFamily: "CustomMovieFont, sans-serif" }}
              >
                Big fan of comedy-dramas with meaning and emotion.
              </Typography>
              <Typography
                component="a"
                href="https://www.linkedin.com/in/nitzannaveh/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  mt: 1,
                  display: "block",
                  color: "#2196f3",
                  textDecoration: "underline",
                  fontFamily: "CustomMovieFont, sans-serif",
                }}
              >
                LinkedIn
              </Typography>
            </Card>
          </Grid>

          {/* 🔹 Yonatan */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "rgba(33,33,33,0.95)",
                borderRadius: "16px",
              }}
            >
              <Avatar
                src="/images/Yonatan.jpg"
                alt="Yonatan"
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#F44336", fontFamily: "CustomMovieFont, sans-serif" }}
              >
                Yonatan
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#ccc", mt: 1, fontFamily: "CustomMovieFont, sans-serif" }}
              >
                Horror lover who lives for suspense and scares.
              </Typography>
              <Typography
                component="a"
                href="https://www.linkedin.com/in/yonatan-cohen-a22054312/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  mt: 1,
                  display: "block",
                  color: "#2196f3",
                  textDecoration: "underline",
                  fontFamily: "CustomMovieFont, sans-serif",
                }}
              >
                LinkedIn
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#F44336", mb: 2, fontFamily: "CustomMovieFont, sans-serif" }}
          >
            Join Our MovieVerse 🚀
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#ccc", maxWidth: 700, mx: "auto", fontFamily: "CustomMovieFont, sans-serif" }}
          >
            We’re building something for movie fans, by movie fans. Join the
            community, get recommendations, post reviews, and discover your next
            obsession.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
