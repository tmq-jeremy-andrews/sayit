import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

const Default = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
};

export default Default;
