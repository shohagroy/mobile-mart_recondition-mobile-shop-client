import React, { useContext } from "react";
import { AuthContex } from "../../../../GobalAuthProvaider/GobalAuthProvaider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import DashbordLoader from "../../../Shared/DashbordLoader/DashbordLoader";
import paidImg from "../../../../assets/paid-5025785_1280.webp";

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
    return <DashbordLoader />;
  }

  const removeProductHandelar = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, not be able to recover this Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/products?email=${user.email}&id=${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              refetch();
              swal("Poof! Your Product has been deleted!", {
                icon: "success",
              });
            }
          });
      } else {
        swal("Your Product is safe!");
      }
    });
  };

  const addAdvertiseHandelar = (addItem) => {
    swal({
      title: "Are you sure?",
      text: `You want to Boost this ${addItem.productName} Product! `,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `http://localhost:5000/add-advertise?email=${user.email}&id=${addItem._id}`,
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
            if (data.modifiedCount > 0) {
              refetch();
              swal(`Your ${addItem.productName} Product has been Boosted`, {
                icon: "success",
              });
            }
          });
      }
    });
  };
  const removeAdvertiseHandelar = (addItem) => {
    swal({
      title: "Are you sure?",
      text: `You want to Remove Boost this ${addItem.productName} Product! `,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `http://localhost:5000/remove-advertise?email=${user.email}&id=${addItem._id}`,
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
            if (data.modifiedCount > 0) {
              refetch();
              swal(`Your ${addItem.productName} Product has been Remove!`, {
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <section className="w-full">
      <h3 className="text-2xl text-center  md:text-left mx-4  font-semibold text-accent">
        My Product -<strong className="text-primary">{products?.length}</strong>
      </h3>

      <div className="overflow-x-auto my-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Images</th>
              <th>Name</th>
              <th>Price</th>
              <th>Advertise</th>
              <th>Status</th>
              <th>Deleted</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <tr key={i} className="relative">
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-28 rounded-lg">
                      <img src={product?.images} alt={product?.productName} />
                    </div>
                  </div>
                </td>
                <td>
                  <Link className="hover:text-primary">
                    {product?.productName}
                  </Link>
                </td>
                <td className="text-primary font-semibold">
                  ${product?.sellPrice}
                </td>
                {product.paymentStatus === "PAID" ? (
                  <td>
                    <h2 className="text-xl text-green-500 font-semibold">
                      Already Paid
                    </h2>{" "}
                  </td>
                ) : (
                  <td>
                    {product.isBoosted ? (
                      <button
                        onClick={() => removeAdvertiseHandelar(product)}
                        className="btn btn-primary btn-sm text-white "
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => addAdvertiseHandelar(product)}
                        className="btn bg-green-600 text-white btn-sm "
                      >
                        Advertise
                      </button>
                    )}
                  </td>
                )}

                <td className="text-primary font-bold">
                  {product.paymentStatus === "PAID" ? (
                    <span>Delivery Panding</span>
                  ) : (
                    <span>UNSOLE</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => removeProductHandelar(product._id)}
                    className="btn btn-sm bg-red-600 text-white"
                  >
                    Remove
                  </button>
                </td>
                {product.paymentStatus && (
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

export default MyProduct;
