import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { emptyInstrumento } from "../../../types/types";
import { Button } from "react-bootstrap";

const InstrumentoForm = ({ onSubmit, initialValues }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:8080/categorias");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleChange, errors, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <Field
              id="nombre"
              name="nombre"
              type="text"
              value={values.nombre}
              onChange={handleChange}
              style={{ padding: "10px", border: "1px solid #ccc" }}
            />
            <ErrorMessage name="nombre" component="span" />
          </div>
          <div>
            <label htmlFor="categoria">Categoría:</label>
            <Field
              id="categoria"
              name="categoria"
              as="select"
              value={values.categoria}
              onChange={handleChange}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.denominacion}
                </option>
              ))}
            </Field>
            <ErrorMessage name="categoria" component="span" />
          </div>
          <div>
            <label htmlFor="marca">Marca:</label>
            <Field
              id="marca"
              name="marca"
              type="text"
              value={values.marca}
              onChange={handleChange}
            />
            <ErrorMessage name="marca" component="span" />
          </div>
          <div>
            <label htmlFor="modelo">Modelo:</label>
            <Field
              id="modelo"
              name="modelo"
              type="text"
              value={values.modelo}
              onChange={handleChange}
            />
            <ErrorMessage name="modelo" component="span" />
          </div>
          <div>
            <label htmlFor="imagen">Imagen URL:</label>
            <Field
              id="imagen"
              name="imagen"
              type="text"
              value={values.imagen}
              onChange={handleChange}
            />
            <ErrorMessage name="imagen" component="span" />
          </div>
          <div>
            <label htmlFor="precio">Precio:</label>
            <Field
              id="precio"
              name="precio"
              type="number"
              value={values.precio}
              onChange={handleChange}
            />
            <ErrorMessage name="precio" component="span" />
          </div>
          <div>
            <label htmlFor="costoEnvio">Costo de Envío:</label>
            <Field
              id="costoEnvio"
              name="costoEnvio"
              type="text"
              value={values.costoEnvio}
              onChange={handleChange}
            />
            <ErrorMessage name="costoEnvio" component="span" />
          </div>
          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <Field
              id="descripcion"
              name="descripcion"
              as="textarea"
              value={values.descripcion}
              onChange={handleChange}
            />
            <ErrorMessage name="descripcion" component="span" />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default InstrumentoForm;
