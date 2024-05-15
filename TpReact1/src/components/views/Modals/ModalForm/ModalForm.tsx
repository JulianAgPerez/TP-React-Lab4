import { FC, useEffect, useState } from "react";
import {
  Categoria,
  Instrumento,
  emptyInstrumento,
} from "../../../../types/types";
import { Button, Modal, FormGroup, FormLabel } from "react-bootstrap";
import { Formik, Field, Form } from "formik";

type modalProps = {
  show: boolean;
  handleClose: () => void;
  handleAddInstrumento: (newInstrumento: Instrumento) => void;
};

export const ModalForm: FC<modalProps> = ({
  show,
  handleClose,
  handleAddInstrumento,
}) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
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

    fetchCategorias();
  }, []);

  const handleSubmit = async (values: Instrumento) => {
    const categoriaId = parseInt(values.idCategoria as unknown as string, 10);
    console.log(values.idCategoria);
    console.log(categoriaId);
    if (isNaN(categoriaId)) {
      console.error("El id de la categoría no es un número válido");
      return;
    }

    const newInstrumento = {
      ...values,
      idCategoria: {
        id: categoriaId,
        baja: false,
        denominacion:
          categorias.find(
            (categoria: Categoria) => categoria.id === categoriaId
          )?.denominacion || "",
      },
    };

    console.log(newInstrumento);

    try {
      const response = await fetch(
        "http://localhost:8080/instrumentos/productos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newInstrumento),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      handleAddInstrumento(values);
      handleClose();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Instrumento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={emptyInstrumento} onSubmit={handleSubmit}>
          {({ values, setFieldValue, submitForm }) => (
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
                  value={values.idCategoria}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const { value } = e.target;
                    setFieldValue("idCategoria", value);
                  }}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map((categoria: Categoria) => (
                    <option key={categoria.id} value={String(categoria.id)}>
                      {categoria.denominacion}
                    </option>
                  ))}
                </Field>
              </FormGroup>
              <FormGroup>
                <FormLabel>Marca</FormLabel>
                <Field
                  className="form-control"
                  name="marca"
                  type="text"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Modelo</FormLabel>
                <Field
                  className="form-control"
                  name="modelo"
                  type="text"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Imagen</FormLabel>
                <Field
                  className="form-control"
                  name="imagen"
                  type="text"
                  required
                />
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
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={submitForm}>
                Guardar
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
