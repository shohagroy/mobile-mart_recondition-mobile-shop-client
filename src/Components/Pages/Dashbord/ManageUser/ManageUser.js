import React, { useContext } from "react";
import { AuthContex } from "../../../../GobalAuthProvaider/GobalAuthProvaider";
import { useQuery } from "@tanstack/react-query";
import LoadingLoader from "../../../Shared/Loader/LoadingLoader";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const ManageUser = () => {
  const { user } = useContext(AuthContex);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", "removeUserHandelar", user],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users?email=${user.email}`,
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

  const removeUserHandelar = (id, email) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, not be able to recover this Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `http://localhost:5000/users?email=${user.email}&id=${id}&deleteEmail=${email}`,
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
        All User -<strong className="text-primary">{users?.length}</strong>
      </h3>

      <div className="overflow-x-auto my-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Images</th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
              <th>Make Admin</th>
              <th>Deleted</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full border-2 border-primary">
                      <img
                        src="https://placeimg.com/192/192/people"
                        alt={user?.name}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <Link className="hover:text-primary">{user?.name}</Link>
                </td>
                <td className="font-semibold">{user?.email}</td>
                <td>{user.role}</td>
                <td className="text-primary font-bold">
                  <button>Make Admin</button>
                </td>
                <td>
                  <button
                    onClick={() => removeUserHandelar(user._id, user.email)}
                    className="btn btn-sm bg-red-600 text-white"
                  >
                    deleted
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

export default ManageUser;
