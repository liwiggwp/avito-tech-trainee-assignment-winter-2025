import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Router from "./RouteNames";
import Home from "../Pages/Home";
import Item from "../Pages/Item";
import ItemListPage from "../Pages/ItemListPage";

function AppRouter() {
  return (
    <Routes>
      <Route path={Router.HOME} element={<Home />} />
      <Route
        path={Router.ITEM + Router.ID}
        element={<Item />}
      />
       <Route path={Router.LIST} element={<ItemListPage />} />
    </Routes>
  );
}

export default AppRouter;
