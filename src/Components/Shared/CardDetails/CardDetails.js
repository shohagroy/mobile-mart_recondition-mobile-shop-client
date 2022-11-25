import React from "react";
import { useLoaderData } from "react-router-dom";

const CardDetails = () => {
  const product = useLoaderData();

  const {
    _id,
    category,
    condition,
    description,
    images,
    location,
    marcketPrice,
    phone,
    postDate,
    productName,
    purchaseDate,
    sellPrice,
    seller,
    sellerEmail,
  } = product;

  return (
    <section className="max-w-7xl mx-auto">
      <div className="mt-10">
        <div className="h-72 bg-red-300">
          <h2>banar</h2>
        </div>
        <div className="m-10">
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <div>
              <figure>
                <img
                  className="lg:mx-28 lg:mt-10 object-cover"
                  src={images}
                  alt={productName}
                />
              </figure>
            </div>
            <div className="card-body">
              <h2 className="font-bold text-3xl text-primary">{productName}</h2>
              <div className="font-semibold">
                <p>
                  Category:{" "}
                  <span className="text-primary font-semibold text-xl">
                    {category}
                  </span>
                </p>
                <p>
                  Condition:{" "}
                  <span className="text-primary font-semibold text-xl">
                    {condition}!
                  </span>
                </p>
                <p>
                  Use:{" "}
                  <span className="text-primary font-semibold text-xl">
                    {purchaseDate}
                  </span>
                </p>
                <p>
                  Marcket Price:{" "}
                  <del className="text-primary font-semibold text-xl">
                    {marcketPrice} TK
                  </del>
                </p>
                <p className="text-2xl">
                  Price:{" "}
                  <span className="text-primary text-3xl font-semibold text-xl">
                    {sellPrice} TK
                  </span>
                </p>
                <p>
                  Location:{" "}
                  <span className="text-primary font-semibold text-xl">
                    {location}
                  </span>
                </p>
                <div className="flex justify-start mt-3 items-center">
                  <h3 className="font-semibold text-xl mr-4">
                    Post by: {seller}{" "}
                  </h3>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#EC1C24"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </span>
                  <p className="text-xl"> {phone}</p>
                </div>
                <div>
                  <p>
                    Email:{" "}
                    <span className="text-primary font-semibold text-xl">
                      {sellerEmail}
                    </span>
                  </p>
                  <p>
                    Post Date:{" "}
                    <span className=" font-semibold text-xl">{postDate}</span>
                  </p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary text-white font-bold">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardDetails;
