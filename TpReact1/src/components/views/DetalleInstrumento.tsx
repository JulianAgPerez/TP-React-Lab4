import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Instrumento } from "../../types/types";
import { addItem } from "../../redux/slices/CartSlice";
import styles from "/src/styles/Instrumentos.module.css";
import { useAppDispatch } from "../../redux/HookReducer";

export const DetalleInstrumento: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchInstrumento = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/instrumentos/productos/${id}`
        );
        const data = await response.json();
        setInstrumento(data);
      } catch (error) {
        console.error("Error al obtener el instrumento:", error);
      }
    };

    fetchInstrumento();
  }, [id]);

  const handleAgregarCarrito = () => {
    if (instrumento) {
      dispatch(addItem(instrumento));
    }
  };

  if (!instrumento) {
    return <div>Instrumento vacío</div>;
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
            <h3 className={styles.robotoTitulo}>{instrumento.instrumento}</h3>
            <h2
              className={styles.robotoCuerpo}
              style={{ fontSize: "1.6rem", fontWeight: "400" }}
            >
              $ {instrumento.precio}
            </h2>
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
                style={{ marginTop: "2rem", width: "13vw", height: "5vw" }}
                onClick={handleAgregarCarrito}
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
        Descripción:
        <div style={{ paddingTop: "2rem" }}>{instrumento.descripcion}</div>
      </div>
    </div>
  );
};
