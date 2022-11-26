import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminloading, setadminLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://mobile-mart-recondition-mobile-shop-server.vercel.app/chekAdmin/${email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAdmin) {
          setadminLoading(false);
        }
        setIsAdmin(data.isAdmin);
        setadminLoading(false);
      });
  }, [email]);
  return [isAdmin, adminloading];
};

export default useAdmin;
