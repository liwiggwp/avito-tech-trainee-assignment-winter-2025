import Header from "../Components/header/Header";
import SubHeader from "../Components/header/SubHeader";
import React, { useEffect } from "react";
import Api from "../Services/ApiServices";
import ItemList from "../Components/card/ItemList";
import { Box, Container } from "@mui/material";

function Home() {
  const { getItems, items } = Api();

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <>
      <Header />
      <SubHeader />
      <Container maxWidth="lg">
        <h1>Home</h1>
        <ItemList items={items} />
      </Container>
    </>
  );
}
export default Home;
