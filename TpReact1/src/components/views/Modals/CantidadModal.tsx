import React, { useState } from "react";
import styles from "/src/styles/CantidadModal.module.css";
import { Button } from "react-bootstrap";

interface CantidadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (cantidad: number) => void;
}

const CantidadModal: React.FC<CantidadModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [cantidad, setCantidad] = useState<number>(1);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(cantidad);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Seleccionar Cantidad</h2>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          min="1"
        />
        <div className={styles.modalButtons}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </div>
      </div>
    </div>
  );
};

export default CantidadModal;
