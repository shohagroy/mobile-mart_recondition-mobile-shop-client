import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";
import DisplayCard from "../DisplayCard/DisplayCard";
import LoadingLoader from "../Loader/LoadingLoader";

const DisplayProduct = ({ category }) => {
  const { user } = useContext(AuthContex);
  const { category: name } = category;
  const { data: fatchResult, isLoading } = useQuery({
    queryKey: ["data", category],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/all-product?categorys=${name}`
      );
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingLoader />;
  }

  return (
    <div className={`${fatchResult.length ? "block" : "hidden"} my-10`}>
      <div>
        <h2 className="text-xl font-semibold p-2">
          Category: <span className="text-primary font-bold">{name}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fatchResult.map((category) => (
            <DisplayCard
              category={category}
              // addTocatdHandelar={addTocatdHandelar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayProduct;
