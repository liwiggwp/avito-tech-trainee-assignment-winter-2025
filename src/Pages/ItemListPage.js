import React, { useState, useEffect } from "react";
import { Container, Pagination, Box } from "@mui/material";
import ItemListCategory from "../Components/card/ItemListCategory";

function ItemListPage({ filteredItems = [] }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setPage(1);
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Container maxWidth="md">
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