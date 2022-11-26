import React, { useContext } from "react";
import DashbordLoader from "../../Components/Shared/DashbordLoader/DashbordLoader";
import LoadingLoader from "../../Components/Shared/Loader/LoadingLoader";
import useAdmin from "../../Components/Shared/UseAdmin/useAdmin";
import { AuthContex } from "../../GobalAuthProvaider/GobalAuthProvaider";

const AdminRoute = ({ children }) => {
  const { user, logOut } = useContext(AuthContex);
  const [isAdmin, loading] = useAdmin(user?.email);

  if (loading) {
    return <DashbordLoader />;
  }

  if (isAdmin) {
    return children;
  } else logOut();
};

export default AdminRoute;
