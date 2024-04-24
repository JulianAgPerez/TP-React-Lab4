import { useState, useEffect } from "react";
import { Instrumento } from "../types/types";
import styles from "../styles/Instrumentos.module.css";
import { useParams } from "react-router-dom";

export const DetalleInstrumento = () => {
  const { id } = useParams<{ id: string }>();
  const [instrumento, setInstrumento] = useState<Instrumento>();

  useEffect(() => {
    const fetchInstrumento = async () => {
      try {
        const response = await fetch("../../instrumentos.json");
        const data = await response.json();
        const instrumentoEncontrado = data.instrumentos.find(
          (inst: Instrumento) => inst.id.toString() === id
        );
        setInstrumento(instrumentoEncontrado);
      } catch (error) {
        console.error("Error al obtener el instrumento:", error);
      }
    };

    fetchInstrumento();
  }, [id]);

  if (!instrumento) {
    return <div>Instrumento vacio</div>;
  }

  return (
    <div key={instrumento.id}>
      <div className={styles.containerInstrumentoDetalle}>
        <img
          className={styles.imgContainerInsDetalle}
          src={`/img/${instrumento.imagen}`}
        />
        <div className={styles.containerTextoInstrumento}>
          <p className={styles.robotoCuerpo}>
            {instrumento.cantidadVendida} vendidos
          </p>
          <h3 className={styles.robotoTitulo}>{instrumento.instrumento}</h3>
          <h2
            className={styles.robotoCuerpo}
            style={{ fontSize: "1.6rem", fontWeight: "400" }}
          >
            $ {instrumento.precio}
          </h2>
          <span className={styles.robotoCuerpo}>
            {instrumento.costoEnvio === "G" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "lightgreen",
                  fontWeight: "bold",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ marginRight: "5px" }}
                >
                  local_shipping
                </span>
                <p style={{ margin: "0" }}>Envío gratis a todo el país</p>
              </div>
            ) : (
              <div style={{ color: "rgb(290, 150, 90)", fontWeight: "bold" }}>
                Costo de Envío interior de Argentina $ {instrumento.costoEnvio}
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
