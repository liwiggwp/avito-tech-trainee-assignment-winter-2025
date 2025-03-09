import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoAvitoImage from "../../Assets/logo-avito.png";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SearchBar from "../search/SearchBar";
import { Link } from "react-router-dom";
import Api from "../../Services/ApiServices";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function SubHeader({ onSearchChange, onCategoryChange }) {
  const { getCategories, categories } = Api();

  useEffect(() => {
    getCategories();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    handleClose();
  };
  return (
    <Box sx={{ flexGrow: 1, boxShadow: 1, py: 1, position: 'fixed', top: 64, width: '100%', zIndex: 1100, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <img
                src={LogoAvitoImage}
                alt="Avito"
                style={{ height: 32, marginRight: 8 }}
              />
            </Link>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0095FF",
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "16px",
                height: "40px",
              }}
              startIcon={<ManageSearchIcon />}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Все категории
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} onClick={() => handleCategorySelect(category)}>
                  {category}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <SearchBar onSearchChange={onSearchChange} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon sx={{ color: "black" }} />
            <Typography variant="body1" sx={{ color: "black" }}>
              Тюмень
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
}