import React from "react";

const MyBooking = () => {
  return (
    <section className="w-full">
      <h3 className="text-2xl text-center  md:text-left mx-4  font-semibold text-accent">
        My Product -<strong className="text-primary"></strong>
      </h3>

      <div className="overflow-x-auto my-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Images</th>
              <th>Name</th>
              <th>Price</th>
              <th>Advertise</th>
              <th>Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {/* {products?.map((product, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-28 rounded-lg">
                      <img src={product?.images} alt={product?.productName} />
                    </div>
                  </div>
                </td>
                <td>
                  <Link className="hover:text-primary">
                    {product?.productName}
                  </Link>
                </td>
                <td className="text-primary font-semibold">
                  ${product?.sellPrice}
                </td>
                <td>
                  <button className="btn btn-sm">Advertise</button>
                </td>
                <td className="text-primary font-bold">Unsole</td>
                <td>
                  <button
                    onClick={() => removeProductHandelar(product._id)}
                    className="btn btn-sm bg-red-600 text-white"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyBooking;
