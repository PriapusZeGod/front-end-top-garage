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

const queryClient = new QueryClient();
const router = createHashRouter([
  {
    path: "/App",
    element: (
      <QueryClientProvider client={queryClient}>
        <AppPage Nav={Navbar_Main} App={App} />
      </QueryClientProvider>
    ),
  },
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <HomePage Nav={Navbar_Main} Home={Home} />
      </QueryClientProvider>
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
          <ProfilePage Nav={Navbar_Main} Profile={Profile} />
        </QueryClientProvider>
      </>
    ),
  },
  {
    path: "/Addcar",
    element: (
      <QueryClientProvider client={queryClient}>
        <AddCarPage Nav={Navbar_Main} AddCar={Addcar} />
      </QueryClientProvider>
    ),
   },
   {
    path: "/AddGarage",
    element: (
      <QueryClientProvider client={queryClient}>
        <AddGaragePage Nav={Navbar_Main} AddGarage={AddGaragePage} />
      </QueryClientProvider>
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
