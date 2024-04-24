import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetalleInstrumento } from "./components/DetalleInstrumento.tsx";
import Instrumentos from "./components/Instrumentos.tsx";
import { Home } from "./routes/Home.tsx";

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
