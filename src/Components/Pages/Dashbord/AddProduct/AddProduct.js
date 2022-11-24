import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContex } from "../../../../GobalAuthProvaider/GobalAuthProvaider";

const AddProduct = () => {
  const { user } = useContext(AuthContex);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const imgbbHostKey = process.env.REACT_APP_imgbb_host_key;

  console.log(imgbbHostKey);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addProductHandelar = (data) => {
    setLoading(true);
    const productImages = data.images[0];
    const fromData = new FormData();
    fromData.append("images", productImages);

    const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;

    fetch(url, {
      method: "POST",
      body: fromData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData) {
          console.log(imgData);
          const productInfo = {
            seller: user.displayName,
            sellerEmail: user.email,
            productName: data.productName,
            category: data.category,
            condition: data.condition,
            marcketPrice: data.marcketPrice,
            sellPrice: data.sellPrice,
            purchaseDate: data.purchaseDate,
            location: data.location,
            phone: data.phone,
            images: productImages,
            description: value,
            postDate: new Date().toLocaleDateString(),
          };
          console.log(productInfo);

          fetch(`http://localhost:5000/`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setLoading(false);
            });
        }
      });
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold text-accent">Add Products</h3>
      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(addProductHandelar)}
          className="md:w-[500px] p-4 border border-black rounded-lg"
        >
          <div className="form-control my-2 w-full ">
            <input
              {...register("productName", {
                required: "Please Enter Product Name!",
              })}
              className={`input input-bordered border-2 w-full ${
                errors.productName && "border-red-600"
              }`}
              type="text"
              placeholder="Product Name"
            />
            {errors.productName && (
              <p className="text-red-600"> {errors.productName?.message} </p>
            )}
          </div>
          <div className="form-control my-2 w-full ">
            <select
              {...register("category", {
                required: "Please Select Product Category!",
              })}
              className={`select select-bordered border-2 w-full ${
                errors.category && "border-red-600"
              }`}
            >
              <option value="" disabled selected>
                Category
              </option>
              <option value="iPhone">iPhone</option>
              <option value="Samsung">Samsung</option>
              <option value="Vivo">Vivo</option>
              <option value="Oppo">Oppo</option>
              <option value="Realme">Realme</option>
              <option value="Nokia">Nokia</option>
              <option value="Bar Phone">Bar Phone</option>
            </select>
            {errors.category && (
              <p className="text-red-600"> {errors.category?.message} </p>
            )}
          </div>
          <div className="form-control my-2 w-full ">
            <select
              {...register("condition", {
                required: "Please Select Product Condition!",
              })}
              className={`select select-bordered border-2 w-full ${
                errors.condition && "border-red-600"
              }`}
            >
              <option value="" disabled selected>
                Condition
              </option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
            {errors.condition && (
              <p className="text-red-600"> {errors.condition?.message} </p>
            )}
          </div>
          <div className="form-control my-2 w-full ">
            <input
              {...register("marcketPrice", {
                required: "Please Enter Product Marcket Price!",
              })}
              className={`input input-bordered border-2 w-full ${
                errors.marcketPrice && "border-red-600"
              }`}
              type="number"
              placeholder="Product Marcket Price - $"
            />
            {errors.marcketPrice && (
              <p className="text-red-600"> {errors.marcketPrice?.message} </p>
            )}
          </div>
          <div className="form-control my-2 w-full ">
            <input
              {...register("sellPrice", {
                required: "Please Enter Product Sell Price!",
              })}
              className={`input input-bordered border-2 w-full ${
                errors.sellPrice && "border-red-600"
              }`}
              type="number"
              placeholder="Product Sell Price - $"
            />
            {errors.sellPrice && (
              <p className="text-red-600"> {errors.sellPrice?.message} </p>
            )}
          </div>
          <div className="form-control my-2 w-full ">
            <input
              {...register("purchaseDate", {
                required: "Please Enter Product Purchase Date!",
              })}
              className={`input input-bordered border-2 w-full ${
                errors.purchaseDate && "border-red-600"
              }`}
              type="text"
              placeholder="Year of Purchase - Month"
            />
            {errors.purchaseDate && (
              <p className="text-red-600"> {errors.purchaseDate?.message} </p>
            )}
          </div>
          <div className="form-control my-2 w-full ">
            <input
              {...register("location", {
                required: "Please Enter Location!",
              })}
              className={`input input-bordered border-2 w-full ${
                errors.location && "border-red-600"
              }`}
              type="text"
              placeholder="Your Location"
            />
            {errors.location && (
              <p className="text-red-600"> {errors.location?.message} </p>
            )}
          </div>
          <div className="form-control my-2 w-full ">
            <input
              {...register("phone", {
                required: "Please Enter Your Phone Number!",
              })}
              className={`input input-bordered border-2 w-full ${
                errors.number && "border-red-600"
              }`}
              type="text"
              placeholder="Your Number"
            />
            {errors.number && (
              <p className="text-red-600"> {errors.number?.message} </p>
            )}
          </div>
          <div className="form-control my-2 w-full ">
            <input
              type="file"
              {...register("images", {
                required: "Please Upload Product Picture!",
              })}
              className={`input p-2 input-bordered border-2 w-full ${
                errors.images && "border-red-600"
              }`}
            />
            {errors.images && (
              <p className="text-red-600"> {errors.images?.message} </p>
            )}
          </div>

          <div>
            {/* <EditorToolbar /> */}
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder={"Please Enter Product Description..."}
              // modules={modules}
              // formats={formats}
            />
          </div>
          <div className="form-control my-2 w-full ">
            <button
              type="submit"
              value="Add Product"
              className={`input btn btn-outline hover:bg-primary input-bordered w-full ${
                loading && "loading"
              }`}
            >
              {loading ? "Loading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
