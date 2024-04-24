import { useState, useEffect } from "react";
import { Instrumento } from "../types/types";
import styles from "../styles/Instrumentos.module.css";
import { DetalleInstrumento } from "./DetalleInstrumento";
import { Link } from "react-router-dom";

const Instrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

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
          <div className={styles.containerInstrumento}>
            <img src={`/img/${instrumento.imagen}`} />

            <div className={styles.containerTextoInstrumento}>
              <h3 className={styles.robotoTitulo}>{instrumento.instrumento}</h3>

              <h2
                className={styles.robotoCuerpo}
                style={{ fontSize: "1.6rem", fontWeight: "400" }}
              >
                $ {instrumento.precio}
              </h2>

              <span className={styles.robotoCuerpoNegrita}>
                {instrumento.costoEnvio === "G" ? (
                  <div
                    className={`${styles.costoEnvioTexto} ${styles.costoEnvioTextoGratis}`}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ marginRight: "5px" }}
                    >
                      local_shipping
                    </span>
                    <p style={{ margin: "0" }}>
                      Envío gratis para todo el país{" "}
                    </p>
                  </div>
                ) : (
                  <div
                    className={`${styles.costoEnvioTexto} ${styles.costoEnvioTextoPago}`}
                  >
                    Costo de Envío interior de Argentina $
                    {instrumento.costoEnvio}
                  </div>
                )}
              </span>
              <p className={styles.robotoCuerpo}>
                {instrumento.cantidadVendida} vendidos
              </p>
            </div>
            <Link to={`/productos/${instrumento.id}`}>
              <button
                className={styles.button}
                style={{
                  marginLeft: "2rem",
                  width: "13vw",
                  height: "5vw",
                }}
              >
                Ver detalles
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Instrumentos;
