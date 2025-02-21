import httpService from "./HttpServices";
import React, { useEffect, useState } from "react";

export default function Api() {
  const { http } = httpService();
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);

  const getItems = async () => {
    try {
      const response = await http.get(`/items`);
        // console.log(response.data);
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemById = async (id) => {
    try {
      const response = await http.get(`/items/${id}`);
      setItem(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return {
    getItems,
    getItemById,
    items,
    item,
  };
}
