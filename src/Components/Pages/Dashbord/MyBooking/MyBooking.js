import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
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
      return data;
    },
  });

  if (isLoading) {
    return <LoadingLoader />;
  }

  const cancelBookingHandelar = (id) => {
    fetch(`http://localhost:5000/remove-booking?email=${user.email}&id=${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.massege === "unauthorized access") {
          logOut();
          Navigate("/login");
          return;
        }
        if (data.modifiedCount > 0) {
          toast.success("Add to Cart Successfully!");
          refetch();
        }
      });
    console.log(id);
  };
  console.log(bookingProducts);
  return (
    <section className="w-full">
      <h3 className="text-2xl text-center  md:text-left mx-4  font-semibold text-accent">
        My Booking -<strong className="text-primary"></strong>
      </h3>

      <div className="overflow-x-auto my-10">
        <table className="table w-full">
          <thead>
            <tr>
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
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-28 rounded-lg">
                      <img src={booking?.images} alt={booking?.productName} />
                    </div>
                  </div>
                </td>
                <td>
                  {/* <Link className="hover:text-primary">
                    {booking?.productName}
                  </Link> */}
                </td>
                <td className="text-primary font-semibold">
                  ${booking?.sellPrice}
                </td>
                <td>
                  <button className="btn btn-sm">Advertise</button>
                </td>
                <td className="text-primary font-bold">Unsole</td>
                <td>
                  <button
                    onClick={() => cancelBookingHandelar(booking._id)}
                    className="btn btn-sm bg-red-600 text-white"
                  >
                    Remove
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
