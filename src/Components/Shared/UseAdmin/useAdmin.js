import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/chekAdmin/${email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("mobile-mart")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAdmin) {
          setIsAdmin(false);
        }
        setIsAdmin(data.isAdmin);
        setLoading(false);
      });
  }, [email]);
  return [isAdmin, loading];
};

export default useAdmin;
