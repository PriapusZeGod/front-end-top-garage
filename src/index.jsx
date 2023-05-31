import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
//import App from "./App";
import Profile from "./components/Profile/Profile.jsx";
import {createHashRouter, HashRouter, RouterProvider} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import ProfilePage from "./pages/Profile Page/ProfilePage.jsx";
import Navbar_Main from "./components/Nav Bar/Navbar.jsx";
import AddGaragePage from "./pages/Add Garage Page/AddGaragePage.jsx";
import {QueryClient, QueryClientProvider,} from "react-query";
import {ChakraProvider} from "@chakra-ui/react";
import AppPage from "./pages/AppPage";
import AboutPage from "./pages/About Page/AboutPage.jsx";
import About from "./About";
import HomePage from "./pages/Home Page/HomePage.jsx";
import AddCarPage from "./pages/Add Car Page/AddCarPage.jsx";
import Addcar from "./components/Add Car/Addcar.jsx";
import App from "./components/App";
import AddGarage from "./components/Garage/AddGarage.jsx";
import Authorization from "./components/Login";
import MapPage from "./pages/Map Page/MapPage.jsx";
import MapViewComponent from "./components/Widgets/MapView.jsx";
import ImagePage from "./pages/Image Page/ImagePage.jsx";
import AddImage from "./components/Add Car/AddImage.jsx";
import TableComponent from "./components/Widgets/Table.jsx";
import ChartWidget from "./components/Widgets/ChartWidget.jsx";

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
      <HashRouter basename="/front-end-top-garage">
        <RouterProvider router={router} />
      </HashRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
