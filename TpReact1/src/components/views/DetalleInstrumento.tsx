import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Instrumento } from "../../types/types";
import { addItems } from "../../redux/slices/CartSlice";
import styles from "/src/styles/Instrumentos.module.css";
import { useAppDispatch } from "../../redux/HookReducer";
import useNotify from "../../Hooks/useNotify";
import html2pdf from "html2pdf.js";
import CantidadModal from "./Modals/CantidadModal";

export const DetalleInstrumento: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notify = useNotify();
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

  const handleAgregarCarrito = (cantidad: number) => {
    if (instrumento) {
      dispatch(addItems({ instrumento, cantidad }));
      notify("Agregado");
    }
  };

  const handleDescargarPDF = () => {
    document.querySelectorAll(".no-print").forEach((element) => {
      element.classList.add(styles.hidden);
    });

    const element = document.getElementById("instrumento-detalle");
    if (element) {
      html2pdf()
        .from(element)
        .save(`detalle_instrumento_${id}.pdf`)
        .then(() => {
          document.querySelectorAll(".no-print").forEach((element) => {
            element.classList.remove(styles.hidden);
          });
        });
    }
  };

  if (!instrumento) {
    return <div>Instrumento vacío</div>;
  }

  return (
    <div id="instrumento-detalle" key={instrumento.id}>
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
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className={`${styles.button} no-print`}
                  style={{ marginTop: "2rem", width: "13vw", height: "5vw" }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Agregar al carrito
                </button>
                <button
                  className={`${styles.button} no-print`}
                  style={{ marginTop: "2rem", width: "13vw", height: "5vw" }}
                  onClick={handleDescargarPDF}
                >
                  Descargar PDF
                </button>
              </div>
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
      <CantidadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAgregarCarrito}
      />
    </div>
  );
};
