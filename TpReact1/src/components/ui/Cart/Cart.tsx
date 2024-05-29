import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { useAppDispatch } from "../../../redux/HookReducer";
import {
  addItem,
  clearItems,
  reduceItem,
} from "../../../redux/slices/CartSlice";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { CheckoutMp } from "../CheckoutMp";
import { Pedido, PedidoDetalle } from "../../../types/types";
import useNotify from "../../../Hooks/useNotify";
import { setPedidoActual } from "../../../redux/slices/PedidoSlice";

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const notify = useNotify();
  const dispatch = useAppDispatch();
  const [showCheckout, setShowCheckout] = useState<boolean>(false); // Nuevo estado para controlar la visibilidad de CheckoutMp

  const handleGuardarCarrito = async () => {
    const detalles: PedidoDetalle[] = items.map((item) => ({
      cantidad: item.cantidad,
      instrumento: item.instrumento,
    }));
    const pedido: Pedido = {
      pedidoDetalles: detalles,
    };
    console.log(pedido);
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
        dispatch(setPedidoActual(data.idPedido));
        setShowCheckout(true); // Mostrar CheckoutMp después de guardar el carrito
        console.log("Data pedido: ", data.idPedido);
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
      (total, item) => total + item.instrumento.precio * item.cantidad,
      0
    );
  };
  //Calcula subtotal + costo envio
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingCost = items.reduce(
      (total, item) =>
        total +
        (item.instrumento.costoEnvio === "G"
          ? 0
          : parseFloat(item.instrumento.costoEnvio) * item.cantidad),
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
                {item.instrumento.instrumento} -
                <Button
                  onClick={() => dispatch(reduceItem(item.instrumento))}
                  style={{ fontSize: "0.5em", marginRight: "4px" }}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    style={{ fontSize: "1.5em" }}
                  />
                </Button>
                x{item.cantidad}
                <Button
                  onClick={() => dispatch(addItem(item.instrumento))}
                  style={{ fontSize: "0.5em", marginLeft: "4px" }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ fontSize: "1.5em" }}
                  />
                </Button>
                - ${item.instrumento.precio * item.cantidad}
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
          {showCheckout && <CheckoutMp visible={showCheckout} />}
        </div>
      )}
    </div>
  );
};

export default Cart;
