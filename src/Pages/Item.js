import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../Components/header/Header";
import SubHeader from "../Components/header/SubHeader";
import Api from "../Services/ApiServices";

function Item() {
  const { id } = useParams();
  const { getItemById, item } = Api();

  useEffect(() => {
    getItemById(id);
  }, []);

  return (
    <>
      <Header />
      <SubHeader />
      <Container maxWidth="lg">
        <h1>Item</h1>
        <p>{id}</p>
        <ul>
          <li key={item?.id}>
            <h2>{item?.name}</h2>
            <p>{item?.description}</p>
            <p>{item?.location}</p>
            <p>{item?.type}</p>
            <p>{item?.propertyType}</p>
            <p>{item?.area}</p>
            <p>{item?.rooms}</p>
            <p>{item?.price}</p>
          </li>
        </ul>
      </Container>
    </>
  );
}

export default Item;
