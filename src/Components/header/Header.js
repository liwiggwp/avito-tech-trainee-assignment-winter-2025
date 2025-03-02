import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Container, Menu, MenuItem } from "@mui/material";

export default function Header({ onAuthOpen, onFormOpen, user, onLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
                    <MenuItem onClick={onLogout}>Выйти</MenuItem>
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
                sx={{ borderRadius: "10px" }}
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
