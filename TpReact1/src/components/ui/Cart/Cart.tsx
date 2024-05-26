import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { useAppDispatch } from "../../../redux/HookReducer";
import {
  addItem,
  clearItems,
  reduceItem,
  removeItem,
} from "../../../redux/slices/CartSlice";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { CheckoutMp } from "../CheckoutMp";
import { PreferenceMp } from "../../../types/types";
import { createPreferenceMp } from "../../services/FuncionesApi";
import useNotify from "../../../Hooks/useNotify";

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const notify = useNotify();
  const dispatch = useAppDispatch();

  const handleGuardarCarrito = async () => {
    const detalles = items.map((item) => ({
      cantidad: item.cantidad,
      instrumento: item.instrumento_id,
    }));
    const pedido = {
      pedidoDetalles: detalles,
      fecha: new Date(),
    };
    //esto se puede simplificar colocandolo en service
    try {
      const response = await fetch("http://localhost:8080/api/pedidos/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });
      const data = await response.json();
      if (response.ok) {
        notify(data.mensaje);
        //dispatch(clearItems()); //Lo comento para poder usar boton de mercado pago
      } else {
        console.error("Error al guardar el pedido:", data);
      }
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce(
      (total, item) => total + item.instrumento_id.precio * item.cantidad,
      0
    );
  };
  //Calcula subtotal + costo envio
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingCost = items.reduce(
      (total, item) =>
        total +
        (item.instrumento_id.costoEnvio === "G"
          ? 0
          : parseFloat(item.instrumento_id.costoEnvio)),
      0
    );
    return subtotal + shippingCost;
  };

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          <ul>
            {/*Boton con icono de menos para reducir la cantidad */}
            {items.map((item) => (
              <li key={item.id}>
                {item.instrumento_id.instrumento} -
                <Button
                  onClick={() => dispatch(reduceItem(item.instrumento_id))}
                  style={{ fontSize: "0.5em", marginRight: "4px" }}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    style={{ fontSize: "1.5em" }}
                  />
                </Button>
                x{item.cantidad}
                <Button
                  onClick={() => dispatch(addItem(item.instrumento_id))}
                  style={{ fontSize: "0.5em", marginLeft: "4px" }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ fontSize: "1.5em" }}
                  />
                </Button>
                - ${item.instrumento_id.precio * item.cantidad}
              </li>
            ))}
            {/* Boton con icono de mas para aumentar la cantidad */}
          </ul>
          <div>Subtotal: ${calculateSubtotal()}</div>
          <div>Total: ${calculateTotal()}</div>
          <Button
            onClick={() => dispatch(clearItems())}
            style={{ marginRight: "5rem" }}
          >
            Cancelar
          </Button>
          <Button onClick={handleGuardarCarrito}>Guardar Carrito</Button>
          <CheckoutMp />
        </div>
      )}
    </div>
  );
};

export default Cart;
