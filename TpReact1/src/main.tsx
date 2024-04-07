import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CargaImagenes from "./components/CargaImagenes.tsx";
import Instrumentos from "./components/Instrumentos.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>Holaaaa</div>
    <Instrumentos />
  </React.StrictMode>
);
