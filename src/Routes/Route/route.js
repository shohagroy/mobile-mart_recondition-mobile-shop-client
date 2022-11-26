import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../../Components/Pages/Dashbord/AddProduct/AddProduct";
import AllProduct from "../../Components/Pages/Dashbord/AllProduct/AllProduct";
import Dashbord from "../../Components/Pages/Dashbord/Dashbord";
import ManageUser from "../../Components/Pages/Dashbord/ManageUser/ManageUser";
import MyBooking from "../../Components/Pages/Dashbord/MyBooking/MyBooking";
import MyProduct from "../../Components/Pages/Dashbord/MyProduct/MyProduct";
import Payment from "../../Components/Pages/Dashbord/Payment/Payment";
import ErrorPage from "../../Components/Pages/ErrorPage/ErrorPage";
import Home from "../../Components/Pages/Home/Home";
import Login from "../../Components/Pages/Login/Login";
import ShowProduct from "../../Components/Pages/ShowProduct/ShowProduct";
import Signup from "../../Components/Pages/Signup/Signup";
import CardDetails from "../../Components/Shared/CardDetails/CardDetails";
import Main from "../../Layout/Main";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () =>
          fetch(
            "https://mobile-mart-recondition-mobile-shop-server.vercel.app/add-advertise"
          ),
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
        path: "/product",
        element: <ShowProduct />,
        children: [{ path: "product", element: <AllProduct /> }],
      },
      {
        path: "/product-details/:id",
        element: <CardDetails />,
        loader: ({ params }) =>
          fetch(
            `https://mobile-mart-recondition-mobile-shop-server.vercel.app/products-details/${params.id}`
          ),
      },
      {
        path: "/dashbord",
        element: (
          <PrivateRoute>
            <Dashbord />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashbord/my-booking",
            element: <MyBooking />,
          },
          {
            path: "/dashbord",
            element: <MyBooking />,
          },
          // {
          //   path: "/dashbord/payment",
          //   element: <Payment />,
          // },
          {
            path: "/dashbord/payment/:id",
            element: <Payment />,
            loader: ({ params }) =>
              fetch(
                `https://mobile-mart-recondition-mobile-shop-server.vercel.app/payment-product/${params.id}`
              ),
          },
          {
            path: "/dashbord/my-product",
            element: (
              <SellerRoute>
                <MyProduct />
              </SellerRoute>
            ),
          },

          {
            path: "/dashbord/add-product",
            element: (
              <SellerRoute>
                <AddProduct />
              </SellerRoute>
            ),
          },
          {
            path: "/dashbord/all-product",
            element: (
              <AdminRoute>
                <AllProduct />
              </AdminRoute>
            ),
          },
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
