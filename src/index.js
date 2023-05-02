
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GarageList from './components/Garage';
import Profile from './components/Profile';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home";
import ProfilePage from './ProfilePage';
import Navbar_Main from "./components/Navbar";
import Addcar from './components/Addcar';


const router = createHashRouter([
  {
    path: "/App",
    element: <App />,  
  },
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
    element: <ProfilePage Nav={Navbar_Main} Profile={Profile}/>,
},
{
  path: "/Addcar",
  element: <Addcar/>,
},
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
