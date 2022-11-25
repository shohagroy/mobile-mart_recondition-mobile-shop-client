import React from "react";
import loader from "../../../assets/loading_xxi.gif";

const LoadingLoader = () => {
  return (
    <div
      className={`w-screen h-screen absolute  bg-white/70 top-0 z-50 flex justify-center items-center"
        }`}
    >
      <img className="w-100" src={loader} alt="loading" />
    </div>
  );
};

export default LoadingLoader;
