import React, { useEffect, useState } from "react";
import { Container, Pagination, Box } from "@mui/material";
import Header from "../Components/header/Header";
import SubHeader from "../Components/header/SubHeader";
import ItemListCategory from "../Components/card/ItemListCategory";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Api from "../Services/ApiServices";

function ItemListPage() {
  const location = useLocation();
  const { filteredItems } = location.state || { filteredItems: [] };
  const { getItems, items } = Api();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Header />
      <SubHeader
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      <Container maxWidth="md">
        <h1>Item List</h1>
        <ItemListCategory items={paginatedItems} />
        {filteredItems.length > itemsPerPage && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil(filteredItems.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Container>
    </>
  );
}

export default ItemListPage;