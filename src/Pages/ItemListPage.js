import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Header from "../Components/header/Header";
import SubHeader from "../Components/header/SubHeader";
import ItemList from "../Components/card/ItemList";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Api from "../Services/ApiServices";

function ItemListPage() {
  const location = useLocation();
  const { filteredItems } = location.state || { filteredItems: [] };
  const { getItems, items } = Api();
  const navigate = useNavigate();

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

  return (
    <>
      <Header />
      <SubHeader
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      <Container maxWidth="lg">
        <h1>Item List</h1>
        <ItemList items={filteredItems} />
      </Container>
    </>
  );
}

export default ItemListPage;
