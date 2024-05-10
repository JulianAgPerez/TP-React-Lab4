import { useState, useEffect } from "react";
import { Instrumento } from "../../types/types";
import styles from "/src/styles/Instrumentos.module.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ModalForm } from "./ModalForm/ModalForm";

const Instrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCloseAddModal = () => setShowAddModal(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/instrumentos/productos"
        );
        const data = await response.json();
        setInstrumentos(data);
        console.log(instrumentos[0].costoEnvio);
      } catch (error) {
        console.error("Error al obtener los instrumentos:", error);
      }
    };

    fetchData();
  }, []);
  const handleAddInstrumento = (newInstrumento: Instrumento) => {
    // Funcionamiento para agregar instrumento

    setShowAddModal(false);
  };
  return (
    <div>
      <div className={styles.agregarInstrumento}>
        <h2>Agregar Instrumento</h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Agregar
        </Button>
      </div>

      <ModalForm // Use the updated modal name "ModalForm"
        show={showAddModal}
        handleClose={handleCloseAddModal}
        handleAddInstrumento={handleAddInstrumento}
      />
      {instrumentos.map((instrumento: Instrumento) => (
        <div key={instrumento.id}>
          <div className={styles.containerInstrumento}>
            <img src={`/img/${instrumento.imagen}`} />
            {/* Nombre instrumento */}
            <div className={styles.containerTextoInstrumento}>
              <h3 className={styles.robotoTitulo}>{instrumento.instrumento}</h3>
              {/* Precio */}
              <h2
                className={styles.robotoCuerpo}
                style={{ fontSize: "1.6rem", fontWeight: "400" }}
              >
                $ {instrumento.precio}
              </h2>
              {/*Costo Envio */}
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
              {/*Vendidos */}
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
