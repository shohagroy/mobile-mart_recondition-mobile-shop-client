import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";
import Banar from "../../Pages/Home/Banar/Banar";
import register from "../../../assets/register-now_3.gif";
import image1 from "../../../assets/img_1.png";
import toast from "react-hot-toast";

const CardDetails = () => {
  const { user, logOut, addCart, setAddCart } = useContext(AuthContex);
  const product = useLoaderData();
  const [bookingLoading, setBookingLoading] = useState(false);

  const navigate = useNavigate();
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

  const addTocatdHandelar = () => {
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

    fetch(
      `https://mobile-mart-recondition-mobile-shop-server.vercel.app/add-carts?email=${user.email}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
        },
        body: JSON.stringify(cartItems),
      }
    )
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

  const addBookNowHandelar = (event) => {
    event.preventDefault();
    setBookingLoading(true);
    const from = event.target;
    const bookingId = product._id;

    const customerName = from.customerName.value;
    const customerEmail = from.customerEmail.value;
    const customerLocation = from.customerLocation.value;
    const customerPhone = from.customerPhone.value;

    delete product._id;

    const bookingProduct = {
      ...product,
      customerName,
      customerEmail,
      customerLocation,
      customerPhone,
      bookingId,
    };

    fetch(
      `https://mobile-mart-recondition-mobile-shop-server.vercel.app/add-booking?email=${user.email}&id=${bookingId}`,
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
          setBookingLoading(false);
        }
      });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="mt-10">
        <div className="">
          <Banar />
        </div>
        <div className="h-[200px] my-10 w-full flex justify-between items-center border border-primary border-2 rounded-lg p-8">
          <div>
            <img
              className="w-[220px] object-cover"
              src={image1}
              alt="Sell Mobile"
            />
          </div>
          <div className="text-center hidden">
            <h2 className="text-primary font-bold text-4xl capitalize">
              Start making money!
            </h2>
            <p className="font-semibold text-2xl capitalize">
              Do you have Mobile Phone to sell? Post your first ad and earn
              money!
            </p>
          </div>
          <div>
            <Link to="../../signUp">
              <img className="w-[180px]" src={register} alt="register now " />
            </Link>
          </div>
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
              <h2 className="font-bold text-4xl text-primary">{productName}</h2>
              <div className="font-semibold">
                <p>
                  Category:{" "}
                  <span className="font-semibold text-xl">{category}</span>
                </p>
                <p>
                  Condition:{" "}
                  <span className="font-semibold text-xl">{condition}!</span>
                </p>
                <p>
                  Use:{" "}
                  <span className=" font-semibold text-xl">{purchaseDate}</span>
                </p>
                <p>
                  Marcket Price:{" "}
                  <del className=" font-bold text-primary text-xl">
                    ${marcketPrice}
                  </del>
                </p>
                <p className="text-2xl">
                  Price:{" "}
                  <span className="text-primary text-3xl font-bold text-xl">
                    ${sellPrice}
                  </span>
                </p>
                <p>
                  Location:{" "}
                  <span className=" font-semibold text-xl">{location}</span>
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
                  <div className="mt-5 font-semibold  text-xl md:text-2xl">
                    <span className="text-primary">{productName}</span> Full
                    Specifications
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>
              <div className="card-actions right-0 m-4 absolute bottom-0">
                <button
                  onClick={addTocatdHandelar}
                  className="btn btn-outline btn-primary text-white"
                >
                  Add to Cart
                </button>

                {user.email ? (
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-primary text-white"
                  >
                    Book now
                  </label>
                ) : (
                  <Link to="/login" className="btn btn-primary text-white">
                    Book now
                  </Link>
                )}
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
                  <form onSubmit={(event) => addBookNowHandelar(event)}>
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
                    <button
                      type="submit"
                      className={`btn btn-primary w-full mt-2 text-white ${
                        bookingLoading && "loading"
                      }`}
                    >
                      {bookingLoading ? "Loading..." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardDetails;
