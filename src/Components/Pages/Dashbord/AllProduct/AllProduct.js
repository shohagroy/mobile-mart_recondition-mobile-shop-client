import React, { useContext } from "react";
import { AuthContex } from "../../../../GobalAuthProvaider/GobalAuthProvaider";
import { useQuery } from "@tanstack/react-query";
import LoadingLoader from "../../../Shared/Loader/LoadingLoader";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const AllProduct = () => {
  const { user } = useContext(AuthContex);

  const {
    data: allProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allProducts", "removeProductHandelar", user],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/all-products?email=${user.email}`,
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

  console.log(allProducts);

  const removeProductHandelar = (id) => {
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, not be able to recover this Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `http://localhost:5000/all-product?email=${user.email}&id=${id}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
            },
          }
        )
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

  return (
    <section className="w-full">
      <h3 className="text-2xl text-center  md:text-left mx-4  font-semibold text-accent">
        All Product -
        <strong className="text-primary">{allProducts?.length}</strong>
      </h3>

      <div className="overflow-x-auto my-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Images</th>
              <th>Name</th>
              <th>Price</th>
              <th>Post Date</th>
              <th>Status</th>
              <th>Deleted</th>
            </tr>
          </thead>
          <tbody>
            {allProducts?.map((product, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-28 mask rounded">
                      <img
                        src="https://placeimg.com/192/192/people"
                        alt={product?.productName}
                      />
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
                <td>{product?.postDate}</td>
                <td className="text-primary font-bold">Unsole</td>
                <td>
                  <button
                    onClick={() => removeProductHandelar(product._id)}
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

export default AllProduct;
