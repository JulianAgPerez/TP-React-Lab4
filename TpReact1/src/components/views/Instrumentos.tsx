import { useState, useEffect } from "react";
import { Categoria, Instrumento } from "../../types/types";
import styles from "/src/styles/Instrumentos.module.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ModalForm } from "./Modals/ModalForm/ModalForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { ModalEdit } from "./Modals/ModalEdit/ModalEdit";
import Cart from "../ui/Cart/Cart";
import useNotify from "../../Hooks/useNotify";
import { useSelector } from "react-redux";

const Instrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [instrumentosBaja, setInstrumentosBaja] = useState<Instrumento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>();

  const handleCloseAddModal = () => setShowAddModal(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedInstrumento, setSelectedInstrumento] = useState<Instrumento>();
  const notify = useNotify();

  const rol = useSelector((state: any) => state.authUser?.rol);

  //Lista categorias y guarda en setCategorias
  const fetchCategorias = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/instrumentos/categorias"
      );
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      console.log("error: ", error);
    }
  };
  //Lista instrumentos
  const fetchInstrumentos = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/instrumentos/productos"
      );
      const data = await response.json();
      // Filtrar los instrumentos con baja = false
      const instrumentosSinBaja = data.filter(
        (instrumento: Instrumento) => !instrumento.baja
      );
      // Filtrar los instrumentos con baja = true
      const instrumentosConBaja = data.filter(
        (instrumento: Instrumento) => instrumento.baja
      );
      setInstrumentos(instrumentosSinBaja);
      //LO USARE PARA LISTAR DADOS DE BAJA
      setInstrumentosBaja(instrumentosConBaja);
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
    setInstrumentos([...instrumentos, newInstrumento]);
    setShowAddModal(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value);
    const selected = categorias.find(
      (categoria) => categoria.id === categoryId
    );
    setSelectedCategory(selected || null);
  };
  //Filtrado
  const arrayInstrumentosFiltrados = instrumentos.filter(
    (instrumento) => instrumento.idCategoria?.id === selectedCategory?.id
  );

  const results = !selectedCategory ? instrumentos : arrayInstrumentosFiltrados;

  const handleEditInstrumento = async (updatedInstrumento: Instrumento) => {
    const id = updatedInstrumento.id;
    console.log("Cuerpo de instrumento:", JSON.stringify(updatedInstrumento));
    try {
      const response = await fetch(
        `http://localhost:8080/instrumentos/productos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(updatedInstrumento),
        }
      );

      notify("Editado");

      if (!response.ok) {
        throw new Error("Error al editar el instrumento");
      }

      setInstrumentos(instrumentos.filter((instrumento) => !instrumento.baja));
    } catch (error) {
      console.error("Error al editar el instrumento:", error);
    }
  };

  const handleDeleteInstrumento = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/instrumentos/productos/${id}`,
        {
          method: "DELETE",
        }
      );
      notify("Eliminado");
      if (!response.ok) {
        throw new Error("Error al eliminar el instrumento");
      }

      setInstrumentos(instrumentos.filter((instrumento) => !instrumento.baja));
    } catch (error) {
      console.error("Error al eliminar el instrumento:", error);
    }
  };

  return (
    <div>
      <div
        className={styles.contenedorPrincipal}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {/*BOTON AGREGAR INSTRUMENTO*/}
        {rol === "Admin" && (
          <div className={styles.agregarInstrumento}>
            <h2>Agregar Instrumento</h2>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              Agregar
            </Button>
          </div>
        )}
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
        <Cart />
      </div>
      <ModalForm
        show={showAddModal}
        handleClose={handleCloseAddModal}
        handleAddInstrumento={handleAddInstrumento}
      />
      {/* RECORRE ARRAY */}
      {results.map((instrumento: Instrumento) => (
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
                {instrumento.costoEnvio === "G" ||
                instrumento.costoEnvio === "g" ? (
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
            {rol === "Admin" && (
              <Button
                variant="danger"
                onClick={() => handleDeleteInstrumento(instrumento.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            )}
            {(rol === "Admin" || rol === "Operador") && (
              <Button
                variant="primary"
                onClick={() => {
                  setSelectedInstrumento(instrumento);
                  setShowAddModal(true);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            )}
            {/* Modal de edición */}
            <ModalEdit
              show={showAddModal}
              handleClose={() => setShowAddModal(false)}
              handleEditInstrumento={handleEditInstrumento}
              instrumento={selectedInstrumento!}
            />
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
