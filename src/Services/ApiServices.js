import httpService from "./HttpServices";
import React, { useEffect, useState } from "react";

export default function Api() {
  const { http } = httpService();
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState([]);

  const getItems = async () => {
    try {
      const response = await http.get(`/items`);
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemById = async (id) => {
    try {
      const response = await http.get(`/items/${id}`);
      setItem(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await http.get(`/categories`);
      console.log(response.data);
      setCategories(response.data);
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
    getCategories,
    items,
    item,
    categories,
  };
}
