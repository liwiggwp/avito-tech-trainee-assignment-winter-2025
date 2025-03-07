import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Container, Menu, MenuItem } from "@mui/material";
import Api from "../../Services/ApiServices";

export default function Header({ onAuthOpen, onFormOpen }) {
  const { token, logout } = Api();
  const user = JSON.parse(localStorage.getItem("user"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (token !== undefined) {
      logout();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#161616" }}>
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Avito tech
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {user ? (
                <>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    onClick={handleMenuOpen}
                  >
                    {user.email}
                  </Typography>
                  <Menu
                    anchorEl={anchorEl}
                    open={anchorEl}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                  </Menu>
                </>
              ) : (
                <Typography
                  color="white"
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={onAuthOpen}
                >
                  Вход и регистрация
                </Typography>
              )}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0095FF",
                  borderRadius: "10px",
                }}
                onClick={onFormOpen}
              >
                Разместить объявление
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
