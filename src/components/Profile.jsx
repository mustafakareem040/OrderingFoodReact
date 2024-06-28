import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logoImage from "../assets/logo.png";

// eslint-disable-next-line react/prop-types
function Profile({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setFirstName(localStorage.getItem("firstName") || "");
    setLastName(localStorage.getItem("lastName") || "");
    setEmail(localStorage.getItem("email") || "");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/onboarding");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          width: "100%",
          padding: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <img
            src={logoImage}
            alt="Little lemon logo"
            style={{ width: "100%", marginBottom: 20 }}
          />
          <Typography variant="h5" component="h2" gutterBottom>
            Personal Information
          </Typography>
          <TextField
            fullWidth
            label="First name"
            value={firstName}
            InputProps={{ readOnly: true }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last name"
            value={lastName}
            InputProps={{ readOnly: true }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            InputProps={{ readOnly: true }}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
