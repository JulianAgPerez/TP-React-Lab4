import { FC, useState } from "react";
import { Instrumento } from "../../../types/types";
import * as yup from "yup";
import { Button, Modal } from "react-bootstrap";
import InstrumentoForm from "../Forms/InstrumentoForm";

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
  const handleSubmit = async (values) => {
    const [isOpen, setIsOpen] = useState(false);
    try {
      // Realizar la solicitud HTTP al servidor
      const response = await fetch("http://localhost:8080/instrumentos", {
        method: "POST", // Utiliza POST para crear un nuevo instrumento
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Convierte los valores del formulario a JSON
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      // Si la solicitud fue exitosa, muestra un mensaje de éxito o redirige a otra página
      console.log("Datos enviados exitosamente");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Manejar el error, como mostrar un mensaje de error al usuario
    }
    setIsOpen(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Instrumento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InstrumentoForm
          initialValues={{}} // Pasa los valores iniciales del formulario según la interfaz Instrumento
          onSubmit={handleSubmit}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" type="submit" form="instrumentoForm">
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
/*
        <InstrumentoForm
          onSubmit={(values) => handleAddInstrumento(values)} // Pasar valores del formulario
          initialValues={{ nombre: "", categoria: "" }} // Pass initial values
        />
        */
