import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  TextField,
  FormControlLabel,
  IconButton,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Api from "../../Services/ApiServices";

const RegisterForm = ({ open, onClose, onLoginOpen, onRegisterSuccess }) => {
  const { register } = Api();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await register(email, password);
      onRegisterSuccess();
    } catch (err) {
      setError("Ошибка: проверьте почту и пароль.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Регистрация
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Box mt={2} component="form" onSubmit={handleRegister}>
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
            autoComplete="new-password"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Согласен с условиями"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, p: 1.5 }}
            type="submit"
          >
            Зарегистрироваться
          </Button>
        </Box>
        <Box mt={3} textAlign="center">
          <Typography variant="body2">Уже есть аккаунт?</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 1, borderRadius: "8px", p: 1 }}
            onClick={() => {
              onClose();
              onLoginOpen();
            }}
          >
            Войти
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
