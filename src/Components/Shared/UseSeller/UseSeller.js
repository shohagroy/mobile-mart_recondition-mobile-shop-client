import React, { useEffect, useState } from "react";

const UseSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/chekSeller/${email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
