import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import DisplayProduct from "../../Shared/DisplayProduct/DisplayProduct";
import LoadingLoader from "../../Shared/Loader/LoadingLoader";
import Banar from "../Home/Banar/Banar";
import { Helmet } from "react-helmet";

const ShowProduct = () => {
  const [categoryName, setCategoryName] = useState("");
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["data", "products"],
    queryFn: async () => {
      const res = await fetch(
        `https://mobile-mart-recondition-mobile-shop-server.vercel.app/products-categorys`
      );
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingLoader />;
  }

  return (
    <section className="max-w-7xl mx-auto">
      <Helmet>
        <title>All Product - Mobile Mart</title>
      </Helmet>
      <div className="">
        <Banar />
      </div>
      <div className="my-10">
        <h2 className="font-semibold text-xl p-2">Browse Items by Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-4 p-4">
          {products.map((category) => (
            <div key={category._id} className="  bg-base-100 shadow-xl">
              <button
                onClick={() => setCategoryName(category.category)}
                className="card-body btn btn-primary w-full  text-white rounded-xl text-center"
              >
                <span className="text-2xl font-bold">{category.category}</span>
              </button>
            </div>
          ))}
          <button
            onClick={() => setCategoryName("")}
            className="card-body btn bg-green-500 hover:bg-green-700 w-full  text-white rounded-xl text-center"
          >
            <span className="text-2xl  font-bold"> Show All</span>
          </button>
        </div>

        <div className="my-10">
          <div>
            {!categoryName
              ? products.map((category) => (
                  <DisplayProduct key={category._id} name={category.category} />
                ))
              : Array([1]).map((category) => (
                  <DisplayProduct key={category._id} name={categoryName} />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowProduct;
