import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Components/header/Header";
import SubHeader from "../Components/header/SubHeader";
import { Container } from "@mui/material";
import Api from "../Services/ApiServices";
import RegisterForm from "../Components/auth/RegisterForm";
import LoginForm from "../Components/auth/LoginForm";
import MultiStepForm from "../Components/MultiStepForm";
function Layout(props) {
  const { token, getItems, items, logout } = Api();
  const navigate = useNavigate();
  const location = useLocation();
  const [authOpen, setAuthOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

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
  }, [location]);

  const handleSearchChange = (searchTerm) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    navigate("/list", { state: { filteredItems: filtered } });
  };

  const handleCategoryChange = (category) => {
    const filtered = items.filter((item) => item.type === category);
    navigate("/list", { state: { filteredItems: filtered } });
  };

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
    navigate(location.pathname);
  };

  const handleRegisterSuccess = () => {
    setRegisterOpen(false);
    setAuthOpen(true);
    navigate("#login");
  };

  const handleFormOpen = () => {
    if (user) {
      setFormOpen(true);
      navigate("#create");
    } else {
      handleAuthOpen();
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    navigate(location.pathname);
  };

  const handleLogout = () => {
    if (token !== undefined) {
      logout();
    }
  };
  return (
    <>
      <Header
        onAuthOpen={handleAuthOpen}
        onFormOpen={handleFormOpen}
        user={user}
        onLogout={handleLogout}
      />
      <SubHeader
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      <Container maxWidth="lg"> {props.main}</Container>
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
      <MultiStepForm open={formOpen} onClose={handleFormClose} />
    </>
  );
}
export default Layout;
