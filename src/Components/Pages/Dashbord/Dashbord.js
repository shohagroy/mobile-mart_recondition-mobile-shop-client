import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";
import useAdmin from "../../Shared/UseAdmin/useAdmin";
import UseSeller from "../../Shared/UseSeller/UseSeller";
import { Helmet } from "react-helmet";

const Dashbord = () => {
  const { user } = useContext(AuthContex);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = UseSeller(user?.email);

  return (
    <section className="max-w-7xl bg-gray-50 p-4 mx-auto min-h-[500px]">
      <Helmet>
        <title>Dashbord - Mobile Mart</title>
      </Helmet>
      <div className="flex justify-between items-start">
        <h3 className="text-3xl font-bold text-accent py-3">Dashbord</h3>
        <div className="hidden md:block">
          <p className="text-2xl py-2 px-4 bg-primary text-white font-semibold border-2 rounded-xl mx-2">
            {new Date().toDateString()}
          </p>
        </div>
        <div className=" md:hidden">
          <div className={`dropdown dropdown-end `}>
            <label
              tabIndex={0}
              className="btn btn-ghost bg-primary btn-circle avatar"
            >
              <div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-primary font-semibold rounded-box w-52"
            >
              <div className="w-full mt-1 bg-primary text-center">
                <Link to="my-booking">
                  <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                    My Booking
                  </button>
                </Link>
              </div>
              {isSeller && (
                <>
                  <div className="w-full mt-1 bg-primary text-center">
                    <Link to="my-product">
                      <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                        My Product
                      </button>
                    </Link>
                  </div>
                  <div className="w-full my-1 bg-primary text-center">
                    <Link to="add-product">
                      <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                        add Product
                      </button>
                    </Link>
                  </div>
                </>
              )}

              {isAdmin && (
                <>
                  <div className="w-full mt-1 bg-primary text-center">
                    <Link to="my-product">
                      <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                        My Product
                      </button>
                    </Link>
                  </div>
                  <div className="w-full mt-1 bg-primary text-center">
                    <Link to="add-product">
                      <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                        add Product
                      </button>
                    </Link>
                  </div>

                  <div className="w-full  bg-primary text-center">
                    <Link to="all-product">
                      <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                        all Product
                      </button>
                    </Link>
                  </div>
                  <div className="w-full bg-primary text-center">
                    <Link to="manage-user">
                      <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                        manage user
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex md:flex">
        <div className="w-[300px] hidden md:flex flex-col items-center border-r-2 min-h-[500px] ">
          <div className="w-full mt-1 bg-primary text-center">
            <Link to="my-booking">
              <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                My Booking
              </button>
            </Link>
          </div>
          {isSeller && (
            <>
              <div className="w-full mt-1 bg-primary text-center">
                <Link to="my-product">
                  <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                    My Product
                  </button>
                </Link>
              </div>
              <div className="w-full my-1 bg-primary text-center">
                <Link to="add-product">
                  <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                    add Product
                  </button>
                </Link>
              </div>
            </>
          )}

          {isAdmin && (
            <>
              <div className="w-full mt-1 bg-primary text-center">
                <Link to="my-product">
                  <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                    My Product
                  </button>
                </Link>
              </div>
              <div className="w-full my-1 bg-primary text-center">
                <Link to="add-product">
                  <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                    add Product
                  </button>
                </Link>
              </div>
              <div className="w-full bg-primary text-center">
                <Link to="all-product">
                  <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                    all Product
                  </button>
                </Link>
              </div>
              <div className="w-full mt-1 bg-primary text-center">
                <Link to="manage-user">
                  <button className="  text-white btn btn-primary w-full text-xl btn-md border-none">
                    manage user
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashbord;
