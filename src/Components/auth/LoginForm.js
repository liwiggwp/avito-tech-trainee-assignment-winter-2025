import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LoginForm = ({ open, onClose, onRegisterOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("email", email);
    console.log("password", password);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Вход
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mt={2} component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Почта"
            variant="outlined"
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <FormControlLabel control={<Checkbox />} label="Запомнить пароль" />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, p: 1.5 }}
            type="submit"
          >
            Войти
          </Button>
        </Box>
        <Box mt={3} textAlign="center">
          <Typography variant="body2">Нет аккаунта?</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 1, borderRadius: "8px", p: 1 }}
            onClick={() => {
              onClose();
              onRegisterOpen();
            }}
          >
            Зарегистрироваться
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;