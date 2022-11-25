import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo_1.png";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";
import LoadingLoader from "../Loader/LoadingLoader";

const Navigation = () => {
  const { user, logOut, addCart } = useContext(AuthContex);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["data", "refetch", addCart],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/add-carts?email=${user.email}`,
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

  const cartRemoveHandelar = (id) => {
    fetch(`http://localhost:5000/add-carts?email=${user.email}&id=${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Items Remove to Cart Successfully!");
        refetch();
      });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar bg-base-100">
          <div className="flex-1 bg-red-300 ">
            <div className="hidden md:block">
              <div>
                <Link to="/">
                  <img
                    className="  md:w-[150px] lg:ml-10"
                    src={logo}
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-none">
            <Link to="/">
              <button className="text-xl mx-2 text-accent hover:text-primary font-semibold ">
                Home
              </button>
            </Link>
            <Link to="/dashbord">
              <button className="text-xl mx-2 text-accent hover:text-primary font-semibold ">
                Dashbord
              </button>
            </Link>
            <Link to="/product">
              <button className="text-xl mx-2 text-accent hover:text-primary font-semibold ">
                Product
              </button>
            </Link>

            {user.email ? (
              <button
                onClick={logOut}
                className="text-xl mx-2 text-accent hover:text-primary font-semibold "
              >
                Log Out
              </button>
            ) : (
              <Link to="/login">
                <button className="text-xl mx-2 text-accent hover:text-primary font-semibold ">
                  Login
                </button>
              </Link>
            )}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm bg-primary text-white indicator-item">
                    {data?.length}
                  </span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 card card-compact dropdown-content bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-primary text-lg">
                    {" "}
                    {data?.length} Items
                  </span>
                  <div className="">
                    {data.map((item) => (
                      <div
                        key={item._id}
                        className="md:w-[500px] bg-base-100 shadow-xl border hover:border-primary hover:border-2 duration-300"
                      >
                        <div className="card-body">
                          <div className="flex justify-between items-center">
                            <Link to={item._id}>
                              <div className="flex">
                                <div className="avatar">
                                  <div className="w-24 rounded">
                                    <img
                                      src={item.images}
                                      alt={item.productName}
                                    />
                                  </div>
                                </div>
                                <div className="ml-3">
                                  <h3 className="text-xl font-bold text-primary">
                                    {item.productName}
                                  </h3>
                                  <p className="text-primary font-semibold">
                                    {item.category}
                                  </p>
                                  <p className="text-xl font-bold">
                                    Price:{" "}
                                    <span className="text-primary">
                                      {item.sellPrice} TK
                                    </span>
                                  </p>
                                  <div className="flex justify-start items-center">
                                    <h3 className="font-semibold mr-4">
                                      {item.seller}{" "}
                                    </h3>
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
                                    <p>{item.phone}</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="card-actions">
                              <button
                                onClick={() => cartRemoveHandelar(item._id)}
                                className="btn text-white text-3xl btn-primary btn-square "
                              >
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            <div className={`dropdown dropdown-end  md:hidden`}>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
