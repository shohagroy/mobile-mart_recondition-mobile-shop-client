import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContex } from "../../../../GobalAuthProvaider/GobalAuthProvaider";
import ChekoutFrom from "./ChekoutFrom";

const stripePromise = loadStripe(process.env.REACT_APP_strip_pk);

const Payment = () => {
  const { user } = useContext(AuthContex);
  const bookingProduct = useLoaderData();
  const [chekOutFrom, setChekOutFrom] = useState(false);

  const { category, images, location, phone, productName, sellPrice, seller } =
    bookingProduct;

  console.log(user);

  console.log(bookingProduct);

  return (
    <div className="w-full">
      {/*  */}
      <div className="mx-10 font-semibold">
        <h3 className="text-2xl">
          Hello <span className="text-primary">{user.displayName}</span>, Have a
          Nice Day!
        </h3>
      </div>

      <div className="card card-side bg-base-100 m-4 shadow-xl">
        <div className="card-body relative">
          <h2 className="card-title mx-2">
            Please Fill this from Below and Prosed to Payment!
          </h2>
          <div className="absolute top-0 left- bg-white">
            {/* <Elements stripe={stripePromise}>
              <ChekoutFrom booking={"myAppointment"}></ChekoutFrom>
            </Elements> */}
          </div>
          <form>
            <input
              type="text"
              className="input input-bordered text-xl font-semibold input-primary mx-2 w-full max-w-xs"
              value={user.displayName}
              disabled
            />
            <input
              type="text"
              className="input font-semibold text-xl input-bordered input-primary ml-2 w-full max-w-xs"
              value={user.email}
              disabled
            />
            <input
              type="text"
              required
              className="input  font-semibold text-xl input-bordered input m-2 w-full "
              placeholder="Shipping Address (Full)"
            />
            <input
              type="number"
              required
              className="input  font-semibold text-xl input-bordered input m-2 w-full "
              placeholder="Your Phone Number"
            />

            <p className="card-title mx-2">Product Details:</p>
            <input
              type="text"
              className="input  font-semibold text-xl max-w-xs input-bordered input m-2 w-full "
              disabled
              value={productName}
            />
            <input
              type="text"
              className="input  font-semibold text-xl max-w-xs input-bordered input m-2 w-full "
              disabled
              value={category}
            />
            <input
              type="text"
              className="input  font-semibold text-xl max-w-xs input-bordered input m-2 w-full "
              disabled
              value={location}
            />
            <input
              type="text"
              className="input  font-semibold text-xl max-w-xs input-bordered input m-2 w-full "
              disabled
              value={sellPrice}
            />

            <p className="card-title mx-2">Product Details:</p>
            <input
              type="text"
              className="input  font-semibold text-xl max-w-xs input-bordered input m-2 w-full "
              disabled
              value={seller}
            />
            <input
              type="text"
              className="input  font-semibold text-xl max-w-xs input-bordered input m-2 w-full "
              disabled
              value={`Verify User`}
            />

            <input
              type="text"
              className="input  font-semibold text-xl max-w-xs input-bordered input m-2 w-full "
              disabled
              value={phone}
            />
          </form>
          <div className="card-actions justify-center">
            <label
              htmlFor="payment-modal"
              className="btn btn-primary text-white"
            >
              proceed the payment
            </label>

            <input
              type="checkbox"
              id="payment-modal"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="payment-modal"
                  className="btn btn-sm btn-primary text-white font-bold btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>

                <Elements stripe={stripePromise}>
                  <ChekoutFrom booking={"myAppointment"}></ChekoutFrom>
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default Payment;
