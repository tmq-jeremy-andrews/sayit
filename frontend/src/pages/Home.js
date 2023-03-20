import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Home = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Home;
