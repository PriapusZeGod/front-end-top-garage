import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GarageList from "./components/Garage";
import Profile from "./components/Profile";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./Home";
import ProfilePage from "./pages/ProfilePage";
import Navbar_Main from "./components/Navbar";
import AddGaragePage from "./pages/AddGaragePage";
// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import AddCarPage from "./pages/AddCarPage";
import Addcar from "./components/Addcar";
import Search from "./components/Search";
import AddGarage from "./components/AddGarage";
import Authorization from "./components/Login";
import MapPage from "./pages/MapPage";
import MapView from "./components/MapView";
import MapViewComponent from "./components/MapView";
import ImagePage from "./pages/ImagePage";
import AddImage from "./components/AddImage";
import TableComponent from "./components/Table";
import ChartWidget from "./components/ChartWidget";

const queryClient = new QueryClient();
const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <QueryClientProvider client={queryClient}>
          <Authorization>
            <HomePage Nav={Navbar_Main} Home={Home} />
          </Authorization>
        </QueryClientProvider>
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <QueryClientProvider client={queryClient}>
          <Authorization>
            <ProfilePage Nav={Navbar_Main} Profile={Profile} />
          </Authorization>
        </QueryClientProvider>
      </>
    ),
  },
  {
    path: "/Addcar",
    element: (
      <QueryClientProvider client={queryClient}>
        <Authorization>
          <AddCarPage Nav={Navbar_Main} AddCar={Addcar} />
        </Authorization>
      </QueryClientProvider>
    ),
  },
  {
    path: "/AddGarage",
    element: (
      <QueryClientProvider client={queryClient}>
        <Authorization>
          <AddGaragePage Nav={Navbar_Main} AddGarage={AddGarage} />
        </Authorization>
      </QueryClientProvider>
    ),
  },
  {
    path: "/Map",
    element: (
      <>
        <QueryClientProvider client={queryClient}>
          <Authorization>
            <MapPage Nav={Navbar_Main} MapViewComponent={MapViewComponent} />
          </Authorization>
        </QueryClientProvider>
      </>
    ),
  },
  {
    path: "/garage",
    element: (
      <>
        <QueryClientProvider client={queryClient}>
          <Authorization>
            <ChartWidget isCO2={true} />
            <TableComponent isCO2={true} />
            <ChartWidget isTemperature={true} />
            <TableComponent isTemperature={true} />
            <ChartWidget isHumidity={true} />
            <TableComponent isHumidity={true} />
          </Authorization>
        </QueryClientProvider>
      </>
    ),
  },
  {
    path: "/image",
    element: (
      <>
        <QueryClientProvider client={queryClient}>
          <Authorization>
            <ImagePage Nav={Navbar_Main} AddImage={AddImage} />
          </Authorization>
        </QueryClientProvider>
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals