import httpService from "./HttpServices";
import React, { useEffect, useState } from "react";

export default function Api() {
  const { http } = httpService();
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const response = await http.get(`/items`);
      //   console.log(response.data);
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return {
    getItems,
    items,
  };
}
