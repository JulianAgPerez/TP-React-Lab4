import { HeaderHome } from "../components/ui/Header/header";
import { Outlet } from "react-router-dom";

export const Route = () => {
  return (
    <div>
      <HeaderHome />
      <Outlet />
    </div>
  );
};
