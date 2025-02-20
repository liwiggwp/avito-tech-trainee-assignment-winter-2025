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
          {/* <ul>
    {items.map((item) => (
        <li key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>{item.location}</p>
          <p>{item.type}</p>
          <p>{item.propertyType}</p>
          <p>{item.area}</p>
          <p>{item.rooms}</p>
          <p>{item.price}</p>
        </li>
      ))}
    </ul> */}
          <ItemList />
        </Container>
    </>
  );
}
export default Home;
