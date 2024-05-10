import { FC } from "react";
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
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Instrumento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InstrumentoForm
          onSubmit={(values) => handleAddInstrumento(values)} // Pasar valores del formulario
          initialValues={{ nombre: "", categoria: "" }} // Pass initial values
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
