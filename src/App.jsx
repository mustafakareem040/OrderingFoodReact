import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/Home";
import Onboarding from "./components/Onboarding";
import Profile from "./components/Profile";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F4CE14", // Yellow
    },
    background: {
      default: "#FFFFFF", // White
    },
    text: {
      primary: "#1B1B1B", // Black
    },
    secondary: {
      main: "#495E57", // DeepAquamarine
    },
    tertiary: {
      main: "#EDEFEE", // LightGray
      contrastText: "#1B1B1B", // Black
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  shape: {
    borderRadius: 4,
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("login") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/onboarding" replace />;
    }
    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/onboarding"
            element={<Onboarding setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile setIsLoggedIn={setIsLoggedIn} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/onboarding" />
              )
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
