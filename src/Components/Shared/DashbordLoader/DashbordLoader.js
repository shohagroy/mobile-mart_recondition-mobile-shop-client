import React from "react";
import loader from "../../../assets/loading_xxi.gif";
const DashbordLoader = () => {
  return (
    <div>
      <div
        className={`w-full h-100 flex justify-center items-center"
        }`}
      >
        <img className="w-100" src={loader} alt="loading" />
      </div>
    </div>
  );
};

export default DashbordLoader;
