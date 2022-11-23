import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Shared/Footer/Footer";
import Navigation from "../Components/Shared/Header/Navigation";

const Main = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
