import { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/HookReducer";
import { RootState } from "../redux/Store";
import { Roles } from "../types/types";

export const RutaPrivada = ({
  children,
  rol,
}: {
  children: ReactNode;
  rol: Roles;
}) => {
  const usuario = useAppSelector((state: RootState) => state.auth);

  if (!usuario) {
    return <Navigate replace to="/login" />;
  } else if (rol !== usuario.rol) {
    return <Navigate replace to="/productos" />;
  } else return children;
};
