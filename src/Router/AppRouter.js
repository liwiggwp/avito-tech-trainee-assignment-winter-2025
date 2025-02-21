import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Router from "./RouteNames";
import Home from "../Pages/Home";
import Item from "../Pages/Item";

function AppRouter() {
  return (
    <Routes>
      <Route path={Router.HOME} element={<Home />} />
      <Route
        path={Router.ITEM + Router.ID}
        element={<Item />}
      />
    </Routes>
  );
}

export default AppRouter;
