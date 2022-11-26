import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import DisplayCard from "../../Shared/DisplayCard/DisplayCard";
import LoadingLoader from "../../Shared/Loader/LoadingLoader";
import Banar from "./Banar/Banar";
import redx from "../../../assets/redx.png";

const Home = () => {
  const boostedProduct = useLoaderData();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/display-products");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingLoader />;
  }

  console.log(boostedProduct);
  return (
    <section className="max-w-7xl mx-auto min-h-[90vh]">
      <div className="w-full  ">
        <Banar />
      </div>
      <div className="my-12 ">
        <div className="p-6 rounded-md my-10  bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                className="w-[150px] md:w-[200px]"
                src={redx}
                alt="redx logo"
              />
              {/* <h3 className="text-4xl ml-4 font-bold">
                RED<span className="text-primary">X</span>-
              </h3> */}
              <p className="lg:text-3xl md:text-2xl capitalize font-semibold">
                <span className="hidden md:block">
                  - Get safe and secure delivery of any product through this.
                </span>
              </p>
            </div>
            <Link to={`/product`}>
              <button className="btn btn-md  btn-primary text-white">
                <span className=" md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </span>
                <span className="hidden md:block">Shopping Now</span>
              </button>
            </Link>
          </div>
          <div className="flex justify-between mt-4 md:mt-6 items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Latest Product
            </h2>
          </div>

          <div className="my-4 md:my-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <DisplayCard key={product._id} category={product} />
              ))}
            </div>
          </div>
          <div className="w-full text-right">
            <Link to={`/product`}>
              <button className="btn btn-md  btn-primary text-white">
                View More
              </button>
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-md my-10  bg-gray-5 0">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-primary">
              Fresh recommendations
            </h2>
            <Link to={`/product`}>
              <button className="btn btn-sm btn-outline btn-primary hover:text-white">
                View More
              </button>
            </Link>
          </div>

          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {boostedProduct?.map((product) => (
                <DisplayCard key={product._id} category={product} />
              ))}
            </div>
          </div>
          <div className="w-full text-right">
            <Link to={`/product`}>
              <button className="btn btn-md  btn-primary text-white">
                View More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
