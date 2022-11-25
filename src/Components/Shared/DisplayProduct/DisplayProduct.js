import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";
import LoadingLoader from "../Loader/LoadingLoader";

const DisplayProduct = ({ category }) => {
  const { user, setAddCart, addCart } = useContext(AuthContex);
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

  const addTocatdHandelar = (items) => {
    const { _id, category, images, productName, sellPrice, phone, seller } =
      items;

    const cartItems = {
      cartId: _id,
      productName,
      images,
      sellPrice,
      phone,
      seller,
      category,
    };

    fetch(`http://localhost:5000/add-carts?email=${user.email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
      },
      body: JSON.stringify(cartItems),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success(`${cartItems.productName} Add to Cart Successfully!`);
          setAddCart(!addCart);
        }
      });
  };
  return (
    <div className={`${fatchResult.length ? "block" : "hidden"} my-10`}>
      <div>
        <h2 className="text-xl font-semibold p-2">
          Category: <span className="text-primary font-bold">{name}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fatchResult.map((category) => (
            <div
              key={category._id}
              className="card card-side border-2 bg-base-100 shadow-md"
            >
              <img
                className="p-3 rounded-2xl w-[290px]"
                src={category?.images}
                alt="Movie"
              />
              <figure></figure>
              <div className="card-body">
                <h2 className="card-title">{category.productName}</h2>
                <div>
                  <p>
                    Category:{" "}
                    <span className="font-bold text-primary">
                      {category.category}
                    </span>
                  </p>

                  <p>
                    Purchase Date:{" "}
                    <span className="font-bold text-primary">
                      {category.purchaseDate}!
                    </span>
                  </p>
                  <p>
                    Price:{" "}
                    <span className="font-bold text-primary">
                      {category.sellPrice} TK
                    </span>
                  </p>
                  <p>
                    Location:{" "}
                    <span className="font-bold text-primary">
                      {category.location}
                    </span>
                  </p>

                  <p className="">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: category.description.slice(0, 250),
                      }}
                    />
                    <Link
                      to={`../product-details/${category._id}`}
                      className="text-primary font-semibold"
                    >
                      Read More...
                    </Link>
                  </p>
                  <div className="flex justify-start items-center">
                    <h3 className="font-semibold mr-4">{category.seller} </h3>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#EC1C24"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </span>
                    <p>{category.phone}</p>
                  </div>
                  <p>{category.postDate}</p>
                </div>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => addTocatdHandelar(category)}
                    className="btn btn-sm btn-outline btn-primary text-white"
                  >
                    Add to Cart
                  </button>
                  <button className="btn btn-sm btn-primary text-white">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayProduct;
