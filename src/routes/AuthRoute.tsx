import { Outlet } from "@tanstack/react-location";
import { Login } from "@/components";
import { useAuth } from "@/providers";

const AuthRoute = () => {
  const context = useAuth();

  if (context.status === "loggedOut") {
    return <Login onLogin={() => context.login()} />;
  }

  return <Outlet />;
};

export default AuthRoute;
