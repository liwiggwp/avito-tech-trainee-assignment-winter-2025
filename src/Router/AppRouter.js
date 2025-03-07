import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Router from "./RouteNames";
import Item from "../Pages/ItemPage/Item";
import ItemListPage from "../Pages/ItemListPage";
import Layout from "../Pages/Layout";
import ItemList from "../Components/card/ItemList";

function AppRouter() {
  return (
    <Routes>
      <Route path={Router.HOME} element={<Layout main={<ItemList />} />} />
      <Route
        path={Router.ITEM + Router.ID}
        element={<Layout main={<Item />} />}
      />
      <Route path={Router.LIST} element={<Layout main={<ItemListPage />} />} />
    </Routes>
  );
}

export default AppRouter;
