import React, { useContext } from "react";
import { AuthContex } from "../../../../GobalAuthProvaider/GobalAuthProvaider";
import { useQuery } from "@tanstack/react-query";
import LoadingLoader from "../../../Shared/Loader/LoadingLoader";

const MyProduct = () => {
  const { user } = useContext(AuthContex);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", "removeProductHandelar", user],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingLoader />;
  }
  console.log(products);

  return (
    <section className="w-full">
      <h3 className="text-2xl text-center  md:text-left mx-4  font-semibold text-accent">
        Add Product -
      </h3>
      <div className="w-full flex justify-center items-center"></div>
    </section>
  );
};

export default MyProduct;
