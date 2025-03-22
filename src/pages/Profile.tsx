import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { Edit, Save } from "@mui/icons-material";

interface Post {
  _id: string;
  text: string;
  image?: string;
  likes: string[];
  createdAt: string;
}

interface User {
  username: string;
  profileImage: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:4000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
      setUsername(data.username);
      setPreviewImage(`http://localhost:4000${data.profileImage}`);
    };

    const fetchMyPosts = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:4000/api/posts/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(data);
    };

    fetchProfile();
    fetchMyPosts();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("username", username);
    if (profileImage) formData.append("profileImage", profileImage);

    await axios.put("http://localhost:4000/api/user/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    window.location.reload();
  };

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url('/backround.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "#fff",
        minHeight: "100vh",
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

      <Container maxWidth="md">
        {user && (
          <Card
            sx={{
              mt: 4,
              p: 4,
              textAlign: "center",
              borderRadius: "16px",
              backgroundColor: "rgba(44,44,44,0.95)",
            }}
          >
            <Avatar
              src={previewImage}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                border: "4px solid #F44336",
              }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#F44336", fontFamily: "CustomMovieFont, sans-serif" }}
            >
              {user.username}
            </Typography>

            <TextField
              label="Edit Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                mt: 2,
                input: { color: "#fff" },
                label: { color: "#ccc" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#1e1e1e",
                },
              }}
            />

            <Box display="flex" justifyContent="center" gap={2} mt={2}>
              <Button
                variant="contained"
                component="label"
                startIcon={<Edit />}
                sx={{
                  bgcolor: "#F44336",
                  "&:hover": { bgcolor: "#c62828" },
                  fontFamily: "CustomMovieFont, sans-serif",
                }}
              >
                Upload Photo
                <input type="file" hidden onChange={handleImageChange} />
              </Button>

              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleUpdateProfile}
                sx={{
                  bgcolor: "#F44336",
                  "&:hover": { bgcolor: "#c62828" },
                  fontFamily: "CustomMovieFont, sans-serif",
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        )}

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mt: 6,
            mb: 3,
            color: "#F44336",
            fontFamily: "CustomMovieFont, sans-serif",
            textAlign: "center",
          }}
        >
          🎬 My Posts
        </Typography>

        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} key={post._id}>
              <Card
                sx={{
                  p: 3,
                  backgroundColor: "rgba(33,33,33,0.95)",
                  borderRadius: "12px",
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{ color: "#eee", mb: 2, fontFamily: "CustomMovieFont, sans-serif" }}
                  >
                    {post.text}
                  </Typography>
                  {post.image && (
                    <Box display="flex" justifyContent="center" mt={2}>
                      <img
                        src={`http://localhost:4000${post.image}`}
                        alt="Post"
                        style={{ maxWidth: "100%", borderRadius: "10px" }}
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
