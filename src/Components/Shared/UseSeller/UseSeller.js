import React, { useEffect, useState } from "react";

const UseSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://mobile-mart-recondition-mobile-shop-server.vercel.app/chekSeller/${email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.isSeller) {
          setIsSeller(false);
        }
        setIsSeller(data.isSeller);
        setSellerLoading(false);
      });
  }, [email]);
  return [isSeller, sellerLoading];
};

export default UseSeller;
