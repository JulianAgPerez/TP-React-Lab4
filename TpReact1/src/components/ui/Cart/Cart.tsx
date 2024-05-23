import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { PedidoDetalle } from "../../../types/types";

type CartProps = {
  pedidoDetalles: PedidoDetalle[];
};

export const Cart: React.FC<CartProps> = ({ pedidoDetalles }) => {
  const instrumentos = useSelector((state: RootState) => state.instrumentos);

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
            (inst) => inst.id === pedidoDetalle.instrumento_id
          );
          return (
            <li key={pedidoDetalle.id}>
              {instrumento && (
                <>
                  {instrumento.denominacion} x {pedidoDetalle.cantidad} - $
                  {instrumento.precio * pedidoDetalle.cantidad}
                </>
              )}
            </li>
          );
        })}
      </ul>
      <div>Total: ${calculateTotal()}</div>
    </div>
  );
};

/*

import React, { useState, useEffect } from "react";
import { Instrumento, PedidoDetalle } from "../../../types/types";
import { useFetch } from "../../../Hooks/useFetch";

type CartProps = {
  cart: PedidoDetalle[];
  subtotal: number;
  total: number;
};

export const Cart: React.FC<CartProps> = ({ cart, subtotal, total }) => {
  const {
    data: instrumentos,
    loading,
    error,
  } = useFetch("http://localhost:8080/instrumentos/productos");

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      <ul>
        {loading && <li>Loading...</li>}
        {error && <li>Error</li>}
        {instrumentos &&
          cart.map((item) => {
            // Encontrar el instrumento correspondiente en la lista de instrumentos
            const instrumento = instrumentos.find(
              (inst: { id: number }) => inst.id === item.instrumento_id
            );
            if (!instrumento) return null; // Manejar el caso cuando no se encuentra el instrumento

            return (
              <li key={item.id}>
                {instrumento.instrumento} x {item.cantidad} - $
                {instrumento.precio * item.cantidad}
              </li>
            );
          })}
      </ul>
      <div>Subtotal: ${subtotal}</div>
      <div>Total: ${total}</div>
    </div>
  );
};
*/
/*
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/Store";
import { clearItems } from "../../../redux/slices/CartSlice";
import styles from "/src/styles/Instrumentos.module.css";
import { useAppDispatch } from "../../../redux/HookReducer";

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();

  const handleGuardarCarrito = async () => {
    const pedido = {
      fecha: new Date(),
      total: items.reduce((total, item) => total + item.precio, 0),
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

  return (
    <div className={styles.carrito}>
      <h2>Carrito de Compras</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.instrumento} - ${item.precio}
              </li>
            ))}
          </ul>
          <button className={styles.button} onClick={handleGuardarCarrito}>
            Guardar Carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
*/
