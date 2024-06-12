import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetalleInstrumento } from "./components/views/DetalleInstrumento.tsx";
import Instrumentos from "./components/views/Instrumentos.tsx";
import { Home } from "./components/views/Home/Home.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "./routes/Route.tsx";
import { Provider } from "react-redux";
import store from "./redux/Store.ts";
import { ToastContainer } from "react-toastify";
import { Login } from "./components/views/Login/Login.tsx";
import Reportes from "./components/views/Reportes/Reportes.tsx";
import { Roles } from "./types/types.ts";
import { RutaPrivada } from "./ControlAcceso/RutaPrivada.tsx";
import { Register } from "./components/views/Register/Register.tsx";

export const baseUrl = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
  {
    element: <Route />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/productos",
        element: <Instrumentos />,
      },
      {
        path: "/productos/:id",
        element: <DetalleInstrumento />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/reportes",
        element: (
          <RutaPrivada rol={Roles.ADMIN}>
            <Reportes />
          </RutaPrivada>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
