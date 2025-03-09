import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = ({ authOpen, setAuthOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    if (location.hash === "#login") {
      setAuthOpen(true);
      setRegisterOpen(false);
    } else if (location.hash === "#register") {
      setRegisterOpen(true);
      setAuthOpen(false);
    } else {
      setAuthOpen(false);
      setRegisterOpen(false);
    }
  }, [location, setAuthOpen]);

  const handleAuthOpen = () => {
    setAuthOpen(true);
    setRegisterOpen(false);
    navigate("#login");
  };

  const handleAuthClose = () => {
    setAuthOpen(false);
    navigate(location.pathname);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
    setAuthOpen(false);
    navigate("#register");
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
    navigate(location.pathname);
  };

  const handleLoginSuccess = () => {
    setAuthOpen(false);
    window.location.href = "/";
  };

  const handleRegisterSuccess = () => {
    setRegisterOpen(false);
    setAuthOpen(true);
    navigate("#login");
  };

  return (
    <>
      <LoginForm
        open={authOpen}
        onClose={handleAuthClose}
        onRegisterOpen={handleRegisterOpen}
        onLoginSuccess={handleLoginSuccess}
      />
      <RegisterForm
        open={registerOpen}
        onClose={handleRegisterClose}
        onLoginOpen={handleAuthOpen}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </>
  );
};

export default Auth;