import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import DisplayCard from "../../Shared/DisplayCard/DisplayCard";
import LoadingLoader from "../../Shared/Loader/LoadingLoader";
import Banar from "./Banar/Banar";
import redx from "../../../assets/redx.png";
import { Helmet } from "react-helmet";
import image1 from "../../../assets/img_1.png";
import register from "../../../assets/register-now_3.gif";

const Home = () => {
  const boostedProduct = useLoaderData();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        "https://mobile-mart-recondition-mobile-shop-server.vercel.app/display-products"
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingLoader />;
  }

  return (
    <section className="max-w-7xl mx-auto min-h-[90vh]">
      <Helmet>
        <title>Well Cone to Mobile Mart</title>
      </Helmet>
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

        <div>
          <div className="h-[200px] w-full flex justify-between items-center border border-primary border-2 rounded-lg p-8">
            <div>
              <img
                className="w-[220px] object-cover"
                src={image1}
                alt="Sell Mobile"
              />
            </div>
            <div className="text-center">
              <h2 className="text-primary font-bold text-4xl capitalize">
                Start making money!
              </h2>
              <p className="font-semibold text-2xl capitalize">
                Do you have Mobile Phone to sell? Post your first ad and earn
                money!
              </p>
            </div>
            <div>
              <Link to="signUp">
                <img className="w-[180px]" src={register} alt="register now " />
              </Link>
            </div>
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
            <div className="w-full mt-6 text-right">
              <Link to={`/product`}>
                <button className="btn btn-md  btn-primary text-white">
                  View More
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full bg-primary/80 mt-20">
            <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
              <h1 className="text-5xl antialiased font-bold leading-none text-center text-gray-100">
                Get Our Updates
              </h1>

              <div className="flex pt-8 flex-row">
                <input
                  type="text"
                  placeholder="example@email.com"
                  className="w-3/5 p-3 rounded-l-lg sm:w-2/3"
                />
                <button
                  type="button"
                  className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-green-500  text-white"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
