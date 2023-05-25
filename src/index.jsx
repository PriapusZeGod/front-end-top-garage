import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from "./App";
import GarageList from "./components/Garage";
import Profile from "./components/Profile";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import ProfilePage from "./pages/ProfilePage";
import Navbar_Main from "./components/Navbar";
import AddGaragePage from "./pages/AddGaragePage";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import AppPage from "./pages/AppPage";
import AboutPage from "./pages/AboutPage";
import About from "./About";
import HomePage from "./pages/HomePage";
import AddCarPage from "./pages/AddCarPage";
import Addcar from "./components/Addcar";
import App from "./components/App";
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
    path: "/App",
    element: (
      <QueryClientProvider client={queryClient}>
        <Authorization>
          <AppPage Nav={Navbar_Main} App={App} />
        </Authorization>
      </QueryClientProvider>
    ),
  },
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
    path: "/about",
    element: <AboutPage Nav={Navbar_Main} About={About} />,
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
            <TableComponent/>
            <ChartWidget/>
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
          <ImagePage Nav={Navbar_Main} AddImage={AddImage} />
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
