import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashbord = () => {
  return (
    <section className="max-w-7xl mx-auto min-h-[500px]">
      <div className="flex justify-between items-start">
        <h3 className="text-3xl font-bold text-accent py-3">Dashbord</h3>
        <div>
          <p className="text-2xl py-2 px-4 bg-primary text-white font-semibold border-2 rounded-xl mx-2">
            {new Date().toDateString()}
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="w-[300px] flex flex-col items-center border-r-2 min-h-[500px] ">
          <Link to="my-product">
            <button className="btn  btn-outline btn-sm border-none">
              My Product
            </button>
          </Link>
          <Link to="add-product">
            <button className="btn btn-outline btn-sm border-none">
              Add Product
            </button>
          </Link>
          <Link to="all-product">
            <button className="btn btn-outline btn-sm border-none">
              All Product
            </button>
          </Link>
          <Link to="manage-user">
            <button className="btn btn-outline btn-sm border-none">
              Manage User
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
