import { useQuery } from "@tanstack/react-query";
import React from "react";
import DisplayProduct from "../../Shared/DisplayProduct/DisplayProduct";
import LoadingLoader from "../../Shared/Loader/LoadingLoader";
import UseFatch from "../../Shared/UseFatch/UseFatch";

const ShowProduct = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["data", "category"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products-categorys`);
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingLoader />;
  }

  const { result, categorys } = products;

  return (
    <section className="max-w-7xl mx-auto">
      <div className="h-[400px] bg-red-300">banar</div>
      <div className="my-10">
        <h2 className="font-semibold text-xl">Browse items by Category</h2>

        <div className="grid grid-cols-3 gap-4 p-4">
          {categorys.map((category) => (
            <div key={category._id} className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body bg-primary text-white rounded-xl text-center">
                <h2 className="text-2xl font-bold">{category.category}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="my-10">
          <div>
            {categorys.map((category) => (
              <DisplayProduct key={category._id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowProduct;
