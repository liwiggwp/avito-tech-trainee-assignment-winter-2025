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
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleSearchChange = (searchTerm) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    navigate("/list");
  };

  const handleCategoryChange = (category) => {
    const filtered = items.filter((item) => item.type === category);
    setFilteredItems(filtered);
    navigate("/list");
  };

  const handleFormOpen = () => {
    if (token) {
      setFormOpen(true);
      navigate("#form");
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
      <Container maxWidth="lg"sx={{ mt: 20 }}>
        {React.cloneElement(props.main, { filteredItems })}
      </Container>
      <AuthModal authOpen={authOpen} setAuthOpen={setAuthOpen} />
      <MultiStepForm open={formOpen} onClose={handleFormClose} />
    </>
  );
}

export default Layout;
