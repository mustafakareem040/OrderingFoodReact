import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import logoImage from "../assets/logo.png";
import dessertImage from "../assets/dessert.png";

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [foodMenu, setFoodMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const fetchMenu = useCallback(async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json"
      );
      const data = await response.json();
      setFoodMenu(data.menu);
      setFilteredMenu(data.menu);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    const filtered = foodMenu.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        (selectedCategory === "All" ||
          item.category.toLowerCase() === selectedCategory.toLowerCase())
    );
    setFilteredMenu(filtered);
  }, [query, selectedCategory, foodMenu]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <img src={logoImage} alt="Little lemon logo" style={{ height: 50 }} />
          <Button onClick={() => navigate("/profile")}>
            <SettingsIcon />
          </Button>
        </Box>

        <Box
          sx={{
            bgcolor: "secondary.main",
            color: "white",
            p: 3,
            borderRadius: 2,
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Little Lemon
          </Typography>
          <Typography variant="h6" gutterBottom>
            Chicago
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                We are a family owned Mediterranean restaurant, focused on
                traditional recipes served with a modern twist.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={dessertImage}
                alt="Dessert"
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Grid>
          </Grid>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter search phrase"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          sx={{ mb: 2 }}
        />

        <Typography variant="h5" gutterBottom>
          ORDER FOR DELIVERY!
        </Typography>

        <Box sx={{ display: "flex", gap: 1, overflowX: "auto", mb: 2 }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "contained" : "outlined"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </Box>

        <Grid container spacing={2}>
          {filteredMenu.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                    ₹{item.price}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.title}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
