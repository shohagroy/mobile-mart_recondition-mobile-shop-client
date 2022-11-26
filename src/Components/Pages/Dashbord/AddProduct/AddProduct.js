import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContex } from "../../../../GobalAuthProvaider/GobalAuthProvaider";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingLoader from "../../../Shared/Loader/LoadingLoader";

const AddProduct = () => {
  const { user } = useContext(AuthContex);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [addNew, setAddNew] = useState("");
  const imgbbHostKey = process.env.REACT_APP_imgbb_host_key;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: categoris,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categoris"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/categorys?email=${user.email}`,
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

  const addProductHandelar = (data) => {
    setLoading(true);
    const fromData = new FormData();
    const productImages = data.images[0];
    fromData.append("image", productImages);

    const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;

    fetch(url, {
      method: "POST",
      body: fromData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const productInfo = {
            seller: data.sellerName,
            sellerEmail: data.sellerEmail,
            productName: data.productName,
            category: data.category,
            condition: data.condition,
            marcketPrice: data.marcketPrice,
            sellPrice: data.sellPrice,
            purchaseDate: data.purchaseDate,
            location: data.location,
            phone: data.phone,
            images: imgData.data.url,
            description: value,
            postDate: new Date().toLocaleDateString(),
            postDay: new Date(),
            isBooked: false,
          };

          fetch(`http://localhost:5000/products?email=${user.email}`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
            },
            body: JSON.stringify(productInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                swal(
                  "Successfull!",
                  `You Product ${productInfo.productName} has Added!`,
                  "success"
                );
                navigate("../my-product");
                setLoading(false);
              }
            });
        }
      });
  };

  const addCategoryHandelar = (event) => {
    event.preventDefault();

    const category = event.target.category.value;

    fetch(`http://localhost:5000/categorys?email=${user.email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
      },
      body: JSON.stringify({ category }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          refetch();
          swal(
            "Successfull!",
            `You Catrgory ${category} has Added!`,
            "success"
          );
          event.target.reset();
          // setLoading(false);
        }
      });
  };

  return (
    <section className="w-full">
      <h3 className="text-2xl text-center  md:text-left mx-4  font-semibold text-accent">
        Add Products
      </h3>
      <div className="w-full flex justify-center relative items-center">
        <form
          onSubmit={handleSubmit(addProductHandelar)}
          className="md:w-[800px] p-4  border mx-2 my-10 border-black rounded-lg"
        >
          <div className="form-control  w-full ">
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
              onClick={(event) => setAddNew(event.target.value)}
              {...register("category", {
                required: "Please Select Product Category!",
              })}
              className={`select  select-bordered border-2 w-full ${
                errors.category && "border-red-600"
              }`}
            >
              <option value="" disabled selected>
                Category
              </option>
              {categoris.map((category) => (
                <option key={category._id} value={category.category}>
                  {category.category}
                </option>
              ))}

              <option value="addNew">
                <button onClick={"click"}>+Add new</button>
              </option>
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
              required
              value={user?.displayName}
              {...register("sellerName", {
                required: "Please Enter Product Purchase Date!",
              })}
              className={`input input-bordered border-2 w-full ${
                errors.sellerName && "border-red-600"
              }`}
              type="text"
            />
            {errors.sellerName && (
              <p className="text-red-600"> {errors.sellerName?.message} </p>
            )}
          </div>

          <div className="form-control my-2 w-full ">
            <input
              value={user?.email}
              required
              {...register("sellerEmail", {
                required: "Please Enter Product Purchase Date!",
              })}
              className={`input input-bordered border-2 w-full ${
                errors.sellerEmail && "border-red-600"
              }`}
              type="text"
            />
            {errors.sellerEmail && (
              <p className="text-red-600"> {errors.sellerEmail?.message} </p>
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
                errors.phone && "border-red-600"
              }`}
              type="text"
              placeholder="Your Phone Number"
            />
            {errors.phone && (
              <p className="text-red-600"> {errors.phone?.message} </p>
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
        <div
          className={`absolute w-100 h-full top-[0%] mt-40 left-20 ${
            addNew && addNew === "addNew" ? "absolute" : "hidden"
          }`}
        >
          <div>
            <form
              onSubmit={addCategoryHandelar}
              className="flex justify-between items-center rounded-lg bg-gray-100 border-2 border-black h-full"
            >
              <input
                type="text"
                className="w-full bg-none h-100 py-2 px-4  "
                name="category"
                placeholder="Enter New Category"
              />
              <input
                type="submit"
                className="btn bg-primary text-white"
                value="Add"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
