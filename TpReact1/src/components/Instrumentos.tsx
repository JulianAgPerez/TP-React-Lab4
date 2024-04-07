import { useState, useEffect } from "react";
import { Instrumento } from "../types/types";
import { ContenedorImage } from "./ContenedorImage";

const Instrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../../instrumentos.json");
        const data = await response.json();
        setInstrumentos(data.instrumentos);
      } catch (error) {
        console.error("Error al obtener los instrumentos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {instrumentos.map((instrumento: Instrumento) => (
        <div key={instrumento.id}>
          <h2>{instrumento.instrumento}</h2>

          <ContenedorImage imagen={instrumento.imagen} />

          <p>Marca: {instrumento.marca}</p>
          <p>Modelo: {instrumento.modelo}</p>
          <p>Precio: {instrumento.precio}</p>
        </div>
      ))}
    </div>
  );
};

export default Instrumentos;
