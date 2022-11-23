import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../../Components/Pages/Dashbord/AddProduct/AddProduct";
import Dashbord from "../../Components/Pages/Dashbord/Dashbord";
import ErrorPage from "../../Components/Pages/ErrorPage/ErrorPage";
import Home from "../../Components/Pages/Home/Home";
import Login from "../../Components/Pages/Login/Login";
import Signup from "../../Components/Pages/Signup/Signup";
import Main from "../../Layout/Main";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashbord",
        element: <Dashbord />,
        children: [{ path: "/dashbord/add-product", element: <AddProduct /> }],
      },
    ],
  },
]);
export default route;
