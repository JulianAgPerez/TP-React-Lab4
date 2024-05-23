import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { Instrumento } from "../../../types/types";
import { useAppDispatch } from "../../../redux/HookReducer";
import {
  increaseQuantity,
  decreaseQuantity,
  clearItems,
  createPedido,
} from "../../../redux/slices/CartSlice";

type CartProps = {
  pedidoId: number;
};

export const Cart: React.FC<CartProps> = () => {
  const dispatch = useAppDispatch();
  const pedidos = useSelector((state: RootState) => state.pedidos.pedidos);
  const instrumentos = useSelector(
    (state: RootState) => state.instrumentos.instrumentos
  );

  const pedido = pedidos.find((p) => p.id === pedidoId);
  const pedidoDetalles = pedido?.pedidoDetalles ?? [];

  const handlePagar = () => {
    // Cuando se presione el botón "Pagar", llama a la acción para crear un nuevo pedido
    dispatch(createPedido(pedidoDetalles)); // pedidoDetalles es el array de PedidoDetalle en tu carrito
  };

  const calculateTotal = () => {
    let total = 0;
    pedidoDetalles.forEach((pedidoDetalle) => {
      const instrumento = instrumentos.find(
        (inst) => inst.id === pedidoDetalle.instrumento_id
      );
      if (instrumento) {
        total += instrumento.precio * pedidoDetalle.cantidad;
      }
    });
    return total;
  };

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      <ul>
        {pedidoDetalles.map((pedidoDetalle) => {
          const instrumento = instrumentos.find(
            (inst: Instrumento) => inst.id === pedidoDetalle.instrumento_id
          );
          return (
            <li key={pedidoDetalle.instrumento_id}>
              {/* Botón para reducir la cantidad*/}
              <button
                onClick={() =>
                  dispatch(decreaseQuantity(pedidoDetalle.instrumento_id))
                }
              >
                -
              </button>

              {instrumento && (
                <>
                  {instrumento.instrumento} x {pedidoDetalle.cantidad} - $
                  {instrumento.precio * pedidoDetalle.cantidad}
                </>
              )}
              {/* Botón para aumentar la cantidad*/}
              <button
                onClick={() =>
                  dispatch(increaseQuantity(pedidoDetalle.instrumento_id))
                }
              >
                +
              </button>
            </li>
          );
        })}
      </ul>
      <div>Total: ${calculateTotal()}</div>
      {/* Botón para vaciar el carrito*/}
      <button onClick={() => dispatch(clearItems())}>Cancelar</button>
      <button onClick={() => handlePagar}>Pagar</button>
    </div>
  );
};
