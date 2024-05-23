import { FC, useEffect, useState } from "react";
import { Categoria, Instrumento } from "../../../../types/types";
import { Button, Modal, FormGroup, FormLabel } from "react-bootstrap";
import { Formik, Field, Form } from "formik";

type ModalProps = {
  show: boolean;
  handleClose: () => void;
  handleEditInstrumento: (updatedInstrumento: Instrumento) => void;
  instrumento: Instrumento;
};

export const ModalEdit: FC<ModalProps> = ({
  show,
  handleClose,
  handleEditInstrumento,
  instrumento,
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
    console.log("Formulario enviado:", values);
    handleEditInstrumento(values);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Instrumento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={instrumento} onSubmit={handleSubmit}>
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
                  value={(values.idCategoria as Categoria)?.id || ""}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const { value } = e.target;
                    const selectedCategoria = categorias.find(
                      (c) => c.id === parseInt(value, 10)
                    );
                    setFieldValue("idCategoria", selectedCategoria);
                  }}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map((categoria: Categoria) => (
                    <option key={categoria.id} value={categoria.id}>
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
                Guardar cambios
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
