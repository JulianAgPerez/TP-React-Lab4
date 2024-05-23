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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
