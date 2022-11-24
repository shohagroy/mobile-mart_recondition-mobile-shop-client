import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../../Components/Pages/Dashbord/AddProduct/AddProduct";
import AllProduct from "../../Components/Pages/Dashbord/AllProduct/AllProduct";
import Dashbord from "../../Components/Pages/Dashbord/Dashbord";
import ManageUser from "../../Components/Pages/Dashbord/ManageUser/ManageUser";
import MyProduct from "../../Components/Pages/Dashbord/MyProduct/MyProduct";
import ErrorPage from "../../Components/Pages/ErrorPage/ErrorPage";
import Home from "../../Components/Pages/Home/Home";
import Login from "../../Components/Pages/Login/Login";
import Signup from "../../Components/Pages/Signup/Signup";
import Main from "../../Layout/Main";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
        element: (
          <PrivateRoute>
            <Dashbord />
          </PrivateRoute>
        ),
        children: [
          { path: "/dashbord/my-product", element: <MyProduct /> },
          { path: "/dashbord/add-product", element: <AddProduct /> },
          { path: "/dashbord/all-product", element: <AllProduct /> },
          {
            path: "/dashbord/manage-user",
            element: (
              <AdminRoute>
                <ManageUser />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);
export default route;
