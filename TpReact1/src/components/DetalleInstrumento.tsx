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
          <div className={styles.containerTextoDetalle}>
            <p className={styles.nunito}>
              {instrumento.cantidadVendida} vendidos
            </p>
            {/* Nombre instrumento */}
            <h3 className={styles.robotoTitulo}>{instrumento.instrumento}</h3>
            {/* Precio */}
            <h2
              className={styles.robotoCuerpo}
              style={{ fontSize: "1.6rem", fontWeight: "400" }}
            >
              $ {instrumento.precio}
            </h2>
            {/*Cuerpo */}
            <div
              className={styles.robotoCuerpoNegrita}
              style={{ listStyleType: "none" }}
            >
              <li>Marca: {instrumento.marca}</li>
              <li>Modelo: {instrumento.modelo}</li>
              <div
                className={`${styles.robotoCuerpoNegrita} ${styles.costoEnvio}`}
              >
                Costo Envio:
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
                    <p style={{ margin: "0" }}>Envío gratis </p>
                  </div>
                ) : (
                  <div
                    className={`${styles.costoEnvioTexto} ${styles.costoEnvioTextoPago}`}
                  >
                    ${instrumento.costoEnvio}
                  </div>
                )}
              </div>
              <button
                className={styles.button}
                style={{
                  marginTop: "2rem",
                  width: "13vw",
                  height: "5vw",
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.robotoCuerpoNegrita}
        style={{ paddingLeft: "3rem" }}
      >
        Descripcion:
        <div style={{ paddingTop: "2rem" }}>{instrumento.descripcion}</div>
      </div>
    </div>
  );
};
