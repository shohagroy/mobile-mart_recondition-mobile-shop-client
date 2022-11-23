import React from "react";

const AddProduct = () => {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold text-accent">Add Products</h3>
      <div className="w-full flex justify-center items-center">
        <form className="md:w-[500px] p-4 border border-black rounded-lg">
          <div className="form-control my-2 w-full ">
            <input
              type="text"
              placeholder="Product Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control my-2 w-full ">
            <select className="select select-bordered w-full">
              <option disabled selected>
                Category
              </option>
              <option>iPhone</option>
              <option>Samsung</option>
              <option>Vivo</option>
              <option>Oppo</option>
              <option>Realme</option>
              <option>Nokia</option>
              <option>Bar Phone</option>
            </select>
          </div>
          <div className="form-control my-2 w-full ">
            <select className="select select-bordered w-full">
              <option disabled selected>
                Condition
              </option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
          <div className="form-control my-2 w-full ">
            <input
              type="number"
              placeholder="Marcket Price - $"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control my-2 w-full ">
            <input
              type="number"
              placeholder="Sell Price - $"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control my-2 w-full ">
            <input
              type="number"
              placeholder="Year of Purchase"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control my-2 w-full ">
            <input
              type="text"
              placeholder="Location"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control my-2 w-full ">
            <input
              type="text"
              placeholder="Contact Number"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control my-2 w-full ">
            <input
              type="file"
              placeholder="Contact Number"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control my-2 w-full ">
            <input
              type="submit"
              value="Add Product"
              className="input btn btn-outline hover:bg-primary input-bordered w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
