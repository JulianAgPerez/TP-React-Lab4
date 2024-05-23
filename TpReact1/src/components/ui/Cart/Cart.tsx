import React from "react";
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

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();

  const handleGuardarCarrito = async () => {
    const pedido = {
      fecha: new Date(),
      total: items.reduce(
        (total, item) => total + item.instrumento_id.precio,
        0
      ),
      detalles: items.map((item) => ({
        cantidad: 1, // Suponemos que cada instrumento se agrega una vez
        instrumento_id: item.id,
      })),
    };

    try {
      const response = await fetch("http://localhost:8080/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`El pedido con id ${data.id} se guardó correctamente`);
        dispatch(clearItems());
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
        </div>
      )}
    </div>
  );
};

export default Cart;
