import React, { useContext, useState } from "react";
import { AuthContex } from "../../../../GobalAuthProvaider/GobalAuthProvaider";
import { useQuery } from "@tanstack/react-query";
import LoadingLoader from "../../../Shared/Loader/LoadingLoader";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const ManageUser = () => {
  const { user } = useContext(AuthContex);
  const [role, setRole] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", "removeUserHandelar", user, role],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users?email=${user.email}&role=${role}`,
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

  const userVeifyHandelar = (id) => {
    swal({
      title: "Are you sure?",
      text: "Verifyed This User!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `http://localhost:5000/users-verify?email=${user.email}&id=${id}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.matchedCount > 0) {
              refetch();
              swal("user has been Verifyed!", {
                icon: "success",
              });
            }
          });
      }
    });
  };

  const userUnVeifyHandelar = (id) => {
    swal({
      title: "Are you sure?",
      text: "Unverifyed This User!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `http://localhost:5000/users-unverify?email=${user.email}&id=${id}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.matchedCount > 0) {
              refetch();
              swal("User has been Unverifyed!", {
                icon: "success",
              });
            }
          });
      }
    });
  };

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

  const makeAdminHandelar = (id) => {
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Set Admin Role in This User!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/make-admin?email=${user.email}&id=${id}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount) {
              refetch();
              swal("Create Admin Role Successfully!", {
                icon: "success",
              });
            }
          });
      } else {
      }
    });
  };

  const removeAdminHandelar = (id) => {
    swal({
      title: "Are you sure?",
      text: "Remove Admin Role in This User!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `http://localhost:5000/remove-admin?email=${user.email}&id=${id}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              refetch();
              swal("Remove Admin Role Successfully!", {
                icon: "success",
              });
            }
          });
      } else {
      }
    });
  };

  return (
    <section className="w-full">
      <h3 className="text-2xl text-center capitalize  md:text-left mx-4  font-semibold text-accent">
        {role ? (
          <span>
            All <span> </span>
            {role} - {users?.length}
          </span>
        ) : (
          <span>All Users - {users?.length} </span>
        )}
        {/* All User-<strong className="text-primary">{users?.length}</strong> */}
      </h3>

      <div className="overflow-x-auto my-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Images</th>
              <th>name</th>
              <th>email</th>
              <th>Verify</th>
              <th>
                <select onChange={(event) => setRole(event.target.value)}>
                  <option selected value="">
                    All Users
                  </option>
                  <option value="seller">Customers</option>
                  <option value="customer">Buyers</option>
                </select>
              </th>
              <th>make admin</th>
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
                  <div className="relative">
                    <Link className="hover:text-primary ">
                      <p>{user?.name}</p>
                    </Link>
                    <span
                      className={`badge-md bg-none  -top-3 -right-2 ${
                        user.userStatus ? "absolute" : "hidden"
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
                  </div>
                </td>
                <td className="font-semibold">{user?.email}</td>
                <td>
                  {user.userStatus ? (
                    <button
                      onClick={() => userUnVeifyHandelar(user?._id)}
                      className="btn btn-sm bg-red-600 text-white"
                    >
                      Unverify
                    </button>
                  ) : (
                    <button
                      onClick={() => userVeifyHandelar(user?._id)}
                      className="btn btn-sm bg-green-600 text-white"
                    >
                      Verify
                    </button>
                  )}
                </td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => removeAdminHandelar(user._id)}
                      className="btn btn-sm bg-primary text-white"
                    >
                      remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => makeAdminHandelar(user._id)}
                      className="btn btn-sm bg-green-600 text-white"
                    >
                      Make Admin
                    </button>
                  )}
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
