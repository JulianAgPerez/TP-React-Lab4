import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { emptyInstrumento } from "../../../types/types";
import { Button, FormGroup, FormLabel } from "react-bootstrap";

const InstrumentoForm = ({ initialValues, onSubmit }) => {
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
      <Form>
        <FormGroup>
          <FormLabel>Instrumento</FormLabel>
          <Field
            className="form-control"
            name="instrumento"
            type="text"
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Categoría</FormLabel>
          <Field
            as="select"
            className="form-select"
            name="idCategoria"
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.denominacion}
              </option>
            ))}
          </Field>
        </FormGroup>
        <FormGroup>
          <FormLabel>Marca</FormLabel>
          <Field className="form-control" name="marca" type="text" required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Modelo</FormLabel>
          <Field className="form-control" name="modelo" type="text" required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Imagen</FormLabel>
          <Field className="form-control" name="imagen" type="text" required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Precio</FormLabel>
          <Field
            className="form-control"
            name="precio"
            type="number"
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Costo de Envío</FormLabel>
          <Field
            className="form-control"
            name="costoEnvio"
            type="text"
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Descripción</FormLabel>
          <Field
            className="form-control"
            name="descripcion"
            as="textarea"
            rows={4}
            required
          />
        </FormGroup>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Formik>
  );
};

export default InstrumentoForm;
