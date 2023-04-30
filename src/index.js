import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GarageList from "./components/Garage";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
  {
    path: "/profile",
    element: <GarageList />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
