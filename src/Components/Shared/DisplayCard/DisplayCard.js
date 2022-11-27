import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";
import hotProduct from "../../../assets/hot_badg.webp";
import lookinGood from "../../../assets/lokking_good.gif";
import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";

const DisplayCard = ({ category }) => {
  const { user, logOut, addCart, setAddCart } = useContext(AuthContex);

  const navigate = useNavigate();

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
      userEmail: user.email,
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
        if (data.massege === "unauthorized access") {
          navigate("/login");
          return logOut();
        }
        if (data.massege) {
          toast.error("This Product is Already Added!");
          return;
        }
        if (data.insertedId) {
          setAddCart(!addCart);
          toast.success(`${cartItems.productName} Add to Cart Successfully!`);
        }
      });
  };

  const addBookNowHandelar = (event, product) => {
    event.preventDefault();
    const from = event.target;
    const bookingId = product._id;

    const customerName = from.customerName.value;
    const customerEmail = from.customerEmail.value;
    const customerLocation = from.customerLocation.value;
    const customerPhone = from.customerPhone.value;

    // console.log(bookingId);

    product._id = "";

    const bookingProduct = {
      ...product,
      customerName,
      customerEmail,
      customerLocation,
      customerPhone,
      bookingId,
    };

    // console.log(bookingProduct);
    fetch(
      `http://localhost:5000/add-booking?email=${user.email}&id=${bookingId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
        },
        body: JSON.stringify(bookingProduct),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.massege === "unauthorized access") {
          logOut();
          navigate("/login");
          return;
        }
        if (data.modifiedCount > 0) {
          swal({
            title: "Successfully!",
            text: "Your Selected Product has Booked!",
            icon: "success",
          });
          navigate("../dashbord/my-booking");
          setAddCart(!addCart);
        }
      });
  };

  return (
    <div
      className={`card  md:card-side border-2 bg-base-100 shadow-md
        `}
    >
      {category.isBoosted && (
        <div
          className={`absolute -top-12 -left-4 flex justify-between items-center `}
        >
          <img src={hotProduct} className="w-1/5" alt="Hot badge" />
          <img
            src={lookinGood}
            className="w-1/6 z-50 mt-14 -mr-8 border rounded-full bg-primary"
            alt="Hot badge"
          />
        </div>
      )}

      <img
        className="p-3 object-cover object-fill rounded-2xl md:w-[290px]"
        src={category?.images}
        alt={category.productName}
      />
      <figure></figure>
      <div className="card-body">
        <h2 className="card-title">{category.productName}</h2>
        <div className="mb-6">
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
              ${category.sellPrice}
            </span>
          </p>
          <p>
            Location:{" "}
            <span className="font-bold text-primary">{category.location}</span>
          </p>

          <p className="">
            <span
              dangerouslySetInnerHTML={{
                __html: category.description.slice(0, 220),
              }}
            />
            <Link
              to={`../product-details/${category._id}`}
              className="text-primary font-semibold"
            >
              Read More...
            </Link>
          </p>
          <div className="flex justify-start relative items-center">
            <h3 className="font-semibold mr-4">{category.seller} </h3>
            <span
              className={`badge-md bg-none  -top-2 -left-6 ${
                category.verifyUser ? "absolute" : "hidden"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#01A3F6"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </span>
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
          <p>Post on: {category.postDate}</p>
        </div>
        <div className="card-actions right-0 m-4 absolute bottom-0">
          <button
            onClick={() => addTocatdHandelar(category)}
            className="btn btn-sm btn-outline btn-primary text-white"
          >
            Add to Cart
          </button>

          {/* <button
            onClick={() => addBookNowHandelar(category._id)}
            className="btn btn-sm btn-primary text-white"
          >
            Book Now
          </button> */}
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-primary text-white"
          >
            Book now
          </label>
        </div>
        {/* The button to open modal */}

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-primary text-white btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">{category.productName}</h3>
            <form onSubmit={(event) => addBookNowHandelar(event, category)}>
              <input
                type="text"
                name="customerName"
                value={user.displayName}
                disabled
                className="input input-bordered my-1 w-full"
              />
              <input
                type="text"
                name="customerEmail"
                value={user.email}
                disabled
                className="input input-bordered my-1 w-full"
              />
              <input
                type="text"
                name="customerLocation"
                placeholder="Your Location"
                className="input input-bordered my-1 w-full"
              />
              <input
                type="text"
                placeholder="Your Phone Numer"
                name="customerPhone"
                className="input input-bordered my-1 w-full"
              />
              <input
                type="submit"
                value="Submit"
                className="input btn btn-primary btn-outline text-white input-bordered my-1 w-full"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
