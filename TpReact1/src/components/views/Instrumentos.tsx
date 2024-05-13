import { useState, useEffect } from "react";
import { Categoria, Instrumento } from "../../types/types";
import styles from "/src/styles/Instrumentos.module.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ModalForm } from "./ModalForm/ModalForm";

const Instrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>();

  const handleCloseAddModal = () => setShowAddModal(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchCategorias = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/instrumentos/categorias"
      );
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchInstrumentos = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/instrumentos/productos"
      );
      const data = await response.json();
      setInstrumentos(data);
    } catch (error) {
      console.error("Error al obtener los instrumentos:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
    fetchInstrumentos();
  }, [selectedCategory]); // Re-fetch instruments

  const handleAddInstrumento = (newInstrumento: Instrumento) => {
    // Funcionamiento para agregar instrumento

    setShowAddModal(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value);
    const selected = categorias.find(
      (categoria) => categoria.id === categoryId
    );

    console.log("value: ", categoryId);
    console.log("selected: ", selected?.id);
    console.log(arrayInstrumentosFiltrados);
    //console.log("array ", categorias);
    console.log(categoryId === selected?.id);

    setSelectedCategory(selected || null);
  };
  console.log(selectedCategory);
  const arrayInstrumentosFiltrados = instrumentos.filter(
    (instrumento) => instrumento.idCategoria?.id === selectedCategory?.id
  );

  const results = !selectedCategory ? instrumentos : arrayInstrumentosFiltrados;

  return (
    <div>
      <div
        className={styles.contenedorPrincipal}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {/*BOTON AGREGAR INSTRUMENTO*/}
        <div className={styles.agregarInstrumento}>
          <h2>Agregar Instrumento</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Agregar
          </Button>
        </div>
        {/*COMBOBOX CATEGORIA */}
        <div className={styles.filtrarPorCategoria}>
          <h2>Filtrar por Categoría</h2>
          <select value={selectedCategory?.id} onChange={handleCategoryChange}>
            <option value="">Todas las categorías</option>
            {categorias.map((categoria: Categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.denominacion}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ModalForm
        show={showAddModal}
        handleClose={handleCloseAddModal}
        handleAddInstrumento={handleAddInstrumento}
      />
      {results.map(
        (instrumento: Instrumento) => (
          console.log("***********************"),
          //console.log("IdCategoria: ", instrumento.idCategoria),
          console.log("SelectedCategory ID: ", selectedCategory?.id),
          console.log("Todo el objeto: ", selectedCategory),
          console.log("***********************"),
          (
            <div key={instrumento.id}>
              <div className={styles.containerInstrumento}>
                <img src={`/img/${instrumento.imagen}`} />
                {/* Nombre instrumento */}
                <div className={styles.containerTextoInstrumento}>
                  <h3 className={styles.robotoTitulo}>
                    {instrumento.instrumento}
                  </h3>
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
          )
        )
      )}
    </div>
  );
};

export default Instrumentos;
