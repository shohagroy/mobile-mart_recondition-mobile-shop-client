import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContex } from "../../../GobalAuthProvaider/GobalAuthProvaider";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContex);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.path?.pathname || "/";

  const handelLogin = (data) => {
    setLoading(true);
    setAuthError("");
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;

        const userEmail = { email: user.email };

        if (userEmail) {
          fetch(`http://localhost:5000/jwt`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userEmail),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.jwtToken) {
                localStorage.setItem("mobile-mart", data.jwtToken);
                console.log(data);
                setLoading(false);
                navigate(path, { relative: true });
              }
            });
        }
      })
      .catch((err) => {
        setAuthError(err.code.slice(5));
        setLoading(false);
        console.error(err.code.slice(5));
      });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="h-[70vh] flex  justify-center items-center">
        <div className=" w-96 shadow shadow-lg flex flex-col justify-center items-center p-6  rounded-md">
          <h3 className="text-xl font-semibold text-gray-700">Login</h3>
          <form onSubmit={handleSubmit(handelLogin)} className="w-full">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                required
                {...register("email")}
                className="input input-bordered w-full"
              />

              <p></p>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                required
                {...register("password")}
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text">Forgot Password ?</span>
              </label>
            </div>
            <div>
              <p className="text-center font-bold text-red-600">{authError}</p>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className={`input bg-primary text-white btn bg-accent input-bordered w-full ${
                  loading && "loading"
                }`}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
            <div>
              <p className="label-text text-center mt-2">
                New to Mobile Mart?
                <Link to="../signup" className="text-primary pl-2 font-bold">
                  Create new account
                </Link>
              </p>
            </div>
          </form>
          <div className="divider my-4">OR</div>
          <button className="btn hover:bg-primary btn-outline w-full">
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </section>
  );

  // const handelLogin = (data) => {
  // setAuthError("");
  // login(data.email, data.password)
  //   .then((result) => {
  //     const user = result.user;

  //     const userEmail = { email: user.email };

  //     if (userEmail) {
  //       fetch(`http://localhost:5000/jwt`, {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify(userEmail),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if (data.jwtToken) {
  //             localStorage.setItem("mobile-mart", data.jwtToken);
  //             // navigate(path, { relative: true });
  //           }
  //         });
  //     }
  //   })
  //   .catch((err) => {
  //     setAuthError(err.code.slice(5));
  //     console.error(err.code.slice(5));
  //   });
  // };

  // return (
  //   <section className="max-w-7xl mx-auto">
  // <div className="h-[70vh] flex  justify-center items-center">
  //   <div className=" w-96 shadow shadow-lg flex flex-col justify-center items-center p-6  rounded-md">
  //     <h3 className="text-xl font-semibold text-gray-700">Login</h3>
  //     <form onSubmit={handleSubmit(handelLogin)} className="w-full">
  //       <div>
  //         <label className="label">
  //           <span className="label-text">Email</span>
  //         </label>
  //         <input
  //           type="email"
  //           required
  //           {...register("email")}
  //           className="input input-bordered w-full"
  //         />

  //         <p></p>
  //       </div>
  //       <div>
  //         <label className="label">
  //           <span className="label-text">Password</span>
  //         </label>
  //         <input
  //           type="password"
  //           required
  //           {...register("password")}
  //           className="input input-bordered w-full"
  //         />
  //         <label className="label">
  //           <span className="label-text">Forgot Password ?</span>
  //         </label>
  //       </div>
  //       <div>
  //         <p className="text-center font-bold text-red-600">{authError}</p>
  //       </div>
  //       <div className="mt-4">
  //         <input
  //           type="submit"
  //           value="Login"
  //           className="input btn bg-accent input-bordered w-full"
  //         />
  //       </div>
  //       <div>
  //         <p className="label-text text-center mt-2">
  //           New to Doctors Portal?
  //           <Link to="../signup" className="text-secondary pl-2 font-bold">
  //             Create new account
  //           </Link>
  //         </p>
  //       </div>
  //     </form>
  //     <div className="divider my-4">OR</div>
  //     <button className="btn btn-outline w-full">
  //       CONTINUE WITH GOOGLE
  //     </button>
  //   </div>
  // </div>
  //   </section>
  // );
};

export default Login;
