import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContex } from "../../../../GobalAuthProvaider/GobalAuthProvaider";
import paidImg from "../../../../assets/paid-5025785_1280.webp";
import DashbordLoader from "../../../Shared/DashbordLoader/DashbordLoader";
import { Helmet } from "react-helmet";

const MyBooking = () => {
  const { user, logOut } = useContext(AuthContex);

  const {
    data: bookingProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookingProducts"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/booking-product?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
          },
        }
      );
      const data = await res.json();
      if (data.massege === "unauthorized access") {
        return [];
      }
      return data;
    },
  });

  if (isLoading) {
    return <DashbordLoader />;
  }

  const cancelBookingHandelar = (id) => {
    swal({
      title: "Are you sure?",
      text: "Cancel This Booking,",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log(id);
        fetch(
          `http://localhost:5000/remove-booking?email=${user.email}&id=${id}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.massege === "unauthorized access") {
              logOut();
              Navigate("/login");
              return;
            }
            if (data.modifiedCount > 0) {
              swal("Your Booking Cancel Successfully! ", {
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <section className="w-full">
      <Helmet>
        <title>Booked Product - Mobile Mart</title>
      </Helmet>
      <h3 className="text-2xl text-center  md:text-left mx-4  font-semibold text-accent">
        My Booking -
        <strong className="text-primary">{bookingProducts.length}</strong>
      </h3>

      <div className="overflow-x-auto my-10">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Images</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {bookingProducts?.map((booking, i) => (
              <tr key={i} className="text-center relative">
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-28 rounded-lg">
                      <img src={booking?.images} alt={booking?.productName} />
                    </div>
                  </div>
                </td>
                <td>
                  <Link
                    to={`../../product-details/${booking.bookingId}`}
                    className="hover:text-primary text-2xl font-semibold"
                  >
                    {booking?.productName}
                  </Link>
                </td>
                <td>${booking?.sellPrice}</td>
                <td>
                  {booking.paymentStatus ? (
                    <p className="text-green-600 text-2xl font-bold">
                      {booking.paymentStatus}
                    </p>
                  ) : (
                    <p className="text-primary text-3xl font-bold">UNPAID</p>
                  )}
                </td>
                <td>
                  {booking.paymentStatus ? (
                    <p>{booking?.transactionId}</p>
                  ) : (
                    <Link
                      to={`../payment/${booking.bookingId}`}
                      className="btn mx-auto bg-green-600 text-white btn-sm"
                    >
                      Payment
                    </Link>
                  )}
                </td>
                <td>
                  {booking.paymentStatus ? (
                    <p className="text-primary capitalize font-semibold">
                      delivary Panding
                    </p>
                  ) : (
                    <button
                      onClick={() => cancelBookingHandelar(booking.bookingId)}
                      className="btn btn-sm bg-red-600 text-white"
                    >
                      Cancel
                    </button>
                  )}
                </td>
                {booking.paymentStatus && (
                  <img
                    src={paidImg}
                    className="w-[70px] absolute top-[0] left-[40px]"
                    alt="Paid Image"
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyBooking;
