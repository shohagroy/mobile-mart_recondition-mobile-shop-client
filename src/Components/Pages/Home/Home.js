import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import DisplayCard from "../../Shared/DisplayCard/DisplayCard";
import LoadingLoader from "../../Shared/Loader/LoadingLoader";

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

  console.log(boostedProduct);
  if (isLoading) {
    return <LoadingLoader />;
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div className="w-full md:h-[200px] bg-red-300"> banr</div>
      <div className="my-12">
        <div className="p-6 rounded-md my-10  bg-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-primary">Latest Product</h2>
            <Link to={`/product`}>
              <button className="btn z-50 btn-sm btn-outline btn-primary hover:text-white">
                View More
              </button>
            </Link>
          </div>

          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <DisplayCard key={product._id} category={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-md my-10  bg-gray-200">
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
