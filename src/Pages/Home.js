import Header from "../Components/header/Header";
import SubHeader from "../Components/header/SubHeader";
import React, { useEffect, useState } from "react";
import Api from "../Services/ApiServices";
import ItemList from "../Components/card/ItemList";
import { Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import RegisterForm from "../Components/auth/RegisterForm";
import LoginForm from "../Components/auth/LoginForm";
import MultiStepForm from "../Components/MultiStepForm";

function Home() {
  const { token, getItems, items, logout } = Api();
  const [filteredItems, setFilteredItems] = useState([]);
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
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    if (location.hash === "#login") {
      setAuthOpen(true);
      setRegisterOpen(false);
    } else if (location.hash === "#register") {
      setRegisterOpen(true);
      setAuthOpen(false);
    }
  }, [location]);

  const handleSearchChange = (searchTerm) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    navigate("/list", { state: { filteredItems: filtered } });
  };

  const handleCategoryChange = (category) => {
    const filtered = items.filter((item) => item.type === category);
    setFilteredItems(filtered);
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

  const handleLoginSuccess = (userData) => {
    setAuthOpen(false);
  };

  const handleRegisterSuccess = () => {
    setRegisterOpen(false);
    setAuthOpen(true);
    navigate("#login");
  };

  const handleFormOpen = () => {
    setFormOpen(true);
    navigate("#create");
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
      <Container maxWidth="lg">
        <h1>Home</h1>
        <ItemList items={filteredItems} />
      </Container>
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

export default Home;
