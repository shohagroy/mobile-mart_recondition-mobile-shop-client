import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashbord = () => {
  return (
    <section className="max-w-7xl mx-auto min-h-[500px]">
      <div>
        <h3 className="text-3xl font-bold text-accent py-3">Dashbord</h3>
      </div>
      <div className="flex">
        <div className="w-[300px] border-r-2 min-h-[500px] ">
          <Link to="add-product">
            <button className="btn btn-outline btn-sm border-none">
              Add Product
            </button>
          </Link>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashbord;
