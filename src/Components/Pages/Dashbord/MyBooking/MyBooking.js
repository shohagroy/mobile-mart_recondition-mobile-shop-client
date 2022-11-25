import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContex } from "../../../../GobalAuthProvaider/GobalAuthProvaider";
import LoadingLoader from "../../../Shared/Loader/LoadingLoader";

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
      console.log(data);
      if (data.massege === "unauthorized access") {
        return [];
      }
      return data;
    },
  });

  if (isLoading) {
    return <LoadingLoader />;
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
            console.log(data);
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
  console.log(bookingProducts);
  return (
    <section className="w-full">
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
              <th>Paymeny</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {bookingProducts?.map((booking, i) => (
              <tr key={i} className="text-center">
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
                    to={`../../product-details/${booking._id}`}
                    className="hover:text-primary text-2xl font-semibold"
                  >
                    {booking?.productName}
                  </Link>
                </td>
                <td className="text-primary text-3xl font-bold">
                  ${booking?.sellPrice}
                </td>
                <td className="text-primary text-2xl font-bold">UNPAID</td>
                <td>
                  <Link
                    to={`../payment/${booking._id}`}
                    className="btn mx-auto bg-green-600 text-white btn-sm"
                  >
                    Payment
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => cancelBookingHandelar(booking._id)}
                    className="btn btn-sm bg-red-600 text-white"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyBooking;
