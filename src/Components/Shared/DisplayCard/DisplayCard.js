import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";
import hotProduct from "../../../assets/hot_badg.webp";
import lookinGood from "../../../assets/lokking_good.gif";

const DisplayCard = ({ category }) => {
  const { user, setAddCart, addCart } = useContext(AuthContex);

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
        console.log(data.massege);
        if (data.massege) {
          toast.error("This Product is Already Added!");
          return;
        }
        if (data.insertedId) {
          toast.success(`${cartItems.productName} Add to Cart Successfully!`);
          setAddCart(!addCart);
        }
      });
  };
  return (
    <div className="card relative card-side border-2 bg-base-100 shadow-md">
      {category.isBoosted && (
        <div
          className={`absolute -top-20 -left-4 flex justify-between items-center `}
        >
          <img src={hotProduct} className="w-1/5" alt="Hot badge" />
          <img
            src={lookinGood}
            className="w-1/6 mt-14 -mr-8 border rounded-full bg-primary"
            alt="Hot badge"
          />
        </div>
      )}

      <img
        className="p-3 object-cover object-fill object-contain rounded-2xl w-[290px]"
        src={category?.images}
        alt="Movie"
      />
      <figure></figure>
      <div className="card-body">
        <h2 className="card-title">{category.productName}</h2>
        <div>
          <p>
            Category:{" "}
            <span className="font-bold text-primary">{category.category}</span>
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
            <span className="font-bold text-primary">{category.location}</span>
          </p>

          <p className="">
            <span
              dangerouslySetInnerHTML={{
                __html: category.description.slice(0, 200),
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
  );
};

export default DisplayCard;
