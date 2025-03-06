import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../Components/header/Header";
import SubHeader from "../Components/header/SubHeader";
import Api from "../Services/ApiServices";
import AuthModal from "../Components/auth/Auth";
import MultiStepForm from "../Components/MultiStepForm";

function Layout(props) {
  const { token, getItems, items } = Api();
  const navigate = useNavigate();
  const location = useLocation();
  const [formOpen, setFormOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

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

  const handleFormOpen = () => {
    if (token !== undefined) {
      setFormOpen(true);
      navigate("#create");
    } else {
      setAuthOpen(true);
      navigate("#login");
    }
  };

  const handleFormClose = () => {
    setFormOpen(false);
    navigate(location.pathname);
  };

  return (
    <>
      <Header onAuthOpen={setAuthOpen} onFormOpen={handleFormOpen} />
      <SubHeader
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      <Container maxWidth="lg">{props.main}</Container>
      <AuthModal authOpen={authOpen} setAuthOpen={setAuthOpen} />
      <MultiStepForm open={formOpen} onClose={handleFormClose} />
    </>
  );
}

export default Layout;
