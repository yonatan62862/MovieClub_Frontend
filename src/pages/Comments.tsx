import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import {
  Send,
  ArrowBack,
  Edit,
  Save,
  Cancel,
  Delete,
} from "@mui/icons-material";

interface Comment {
  _id: string;
  user: { _id: string; username: string; profileImage: string };
  text: string;
  createdAt: string;
}

const Comments: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:4000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserId(data._id);
    };

    fetchUser();
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `http://localhost:4000/api/comments/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setComments(data);
  };

  const handleAddComment = async () => {
    if (!text) return alert("Comment cannot be empty");

    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:4000/api/comments",
      { postId, text },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setText("");
    fetchComments();
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditedText(comment.text);
  };

  const handleSaveEdit = async (commentId: string) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:4000/api/comments/${commentId}`,
      { text: editedText },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setEditingCommentId(null);
    fetchComments();
  };

  const handleDeleteComment = async (commentId: string) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:4000/api/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchComments();
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

      <Container maxWidth="md">
        <IconButton onClick={() => navigate("/forum")} sx={{ color: "#F44336" }}>
          <ArrowBack />
        </IconButton>

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
          🎬 Comments
        </Typography>

        <Card
          sx={{
            p: 3,
            mb: 4,
            backgroundColor: "rgba(44, 44, 44, 0.95)",
            borderRadius: "16px",
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Leave a comment.."
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            sx={{
              mb: 2,
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#1e1e1e",
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<Send />}
            onClick={handleAddComment}
            sx={{
              bgcolor: "#F44336",
              "&:hover": { bgcolor: "#c62828" },
              color: "#fff",
            }}
          >
            Add Comment
          </Button>
        </Card>

        <Grid container spacing={2}>
          {comments.map((comment) => (
            <Grid item xs={12} key={comment._id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  backgroundColor: "#1e1e1e",
                  borderRadius: "16px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar
                    src={`http://localhost:4000${comment.user.profileImage}`}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: "#F44336" }}
                  >
                    {comment.user.username}
                  </Typography>
                </Box>

                {editingCommentId === comment._id ? (
                  <>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      variant="outlined"
                      sx={{
                        mb: 2,
                        input: { color: "#fff" },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          backgroundColor: "#2c2c2c",
                        },
                      }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        color="success"
                        onClick={() => handleSaveEdit(comment._id)}
                      >
                        <Save />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setEditingCommentId(null)}
                      >
                        <Cancel />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <Typography sx={{ color: "#eee" }}>{comment.text}</Typography>
                )}

                {userId === comment.user._id &&
                  editingCommentId !== comment._id && (
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                      <IconButton
                        sx={{ color: "#ccc" }}
                        onClick={() => handleEditComment(comment)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        sx={{ color: "#F44336" }}
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Comments;
