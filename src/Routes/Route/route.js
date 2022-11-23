import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../Components/Pages/ErrorPage/ErrorPage";
import Home from "../../Components/Pages/Home/Home";
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
    ],
  },
]);
export default route;
