import Header from "../Components/header/Header";
import SubHeader from "../Components/header/SubHeader";
import React, { useEffect, useState } from "react";
import Api from "../Services/ApiServices";
import ItemList from "../Components/card/ItemList";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const { getItems, items } = Api();
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

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
    navigate("/list", { state: { filteredItems: filtered } });
  };

  const handleCategoryChange = (category) => {
    const filtered = items.filter((item) => item.type === category);
    setFilteredItems(filtered);
    navigate("/list", { state: { filteredItems: filtered } });
  };

  return (
    <>
      <Header />
      <SubHeader onSearchChange={handleSearchChange} onCategoryChange={handleCategoryChange} />
      <Container maxWidth="lg">
        <h1>Home</h1>
        <ItemList items={filteredItems} />
      </Container>
    </>
  );
}

export default Home;