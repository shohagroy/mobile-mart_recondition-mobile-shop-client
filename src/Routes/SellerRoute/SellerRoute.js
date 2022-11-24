import React, { useContext } from "react";
import LoadingLoader from "../../Components/Shared/Loader/LoadingLoader";
import useAdmin from "../../Components/Shared/UseAdmin/useAdmin";
import UseSeller from "../../Components/Shared/UseSeller/UseSeller";
import { AuthContex } from "../../GobalAuthProvaider/GobalAuthProvaider";

const SellerRoute = ({ children }) => {
  const { user, logOut } = useContext(AuthContex);
  const [isAdmin, adminloading] = useAdmin(user.email);
  const [isSeller, sellerLoading] = UseSeller(user.email);

  console.log(user);

  if (adminloading || sellerLoading) {
    return <LoadingLoader />;
  }

  if (isAdmin || isSeller) {
    return children;
  } else {
    logOut();
  }
};

export default SellerRoute;
