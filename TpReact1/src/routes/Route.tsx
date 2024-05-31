import { useLocation } from "react-router-dom";
import { HeaderHome } from "../components/ui/Header/header";
import { Outlet } from "react-router-dom";

export const Route = () => {
  const location = useLocation();

  const hideHeaderPaths = ["/login"];

  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <div>
      {shouldShowHeader && <HeaderHome />}
      <Outlet />
    </div>
  );
};
