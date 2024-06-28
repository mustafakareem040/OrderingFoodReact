import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import logoImage from "../assets/logo.png";

// eslint-disable-next-line react/prop-types
function Onboarding({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      localStorage.setItem("login", "true");
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("email", email);
      setIsLoggedIn(true);
      navigate("/home");
    }
  };

  const isFormValid = () => {
    return (
      firstName.length > 0 &&
      firstName.length <= 128 &&
      lastName.length > 0 &&
      lastName.length <= 128 &&
      /^[a-zA-Z0-9._-]+@[a-z]+\.[a-z]+$/.test(email)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <img
          src={logoImage}
          alt="Little lemon logo"
          style={{ width: "100%", maxWidth: 200, marginBottom: 20 }}
        />
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            bgcolor: "secondary.main",
            color: "white",
            padding: 2,
            width: "100%",
          }}
        >
          {"Let's get to know you"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            fullWidth
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={firstName.length > 128}
            helperText={firstName.length > 128 ? "First name is too long" : ""}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={lastName.length > 128}
            helperText={lastName.length > 128 ? "Last name is too long" : ""}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={
              !/^[a-zA-Z0-9._-]+@[a-z]+\.[a-z]+$/.test(email) && email !== ""
            }
            helperText={
              !/^[a-zA-Z0-9._-]+@[a-z]+\.[a-z]+$/.test(email) && email !== ""
                ? "Invalid email format"
                : ""
            }
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            disabled={!isFormValid()}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default Onboarding;
