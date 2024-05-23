import React, { useState } from "react";
//import { CartProps } from "../../../types/types";
import Cart from "./Cart";
//ELIMINAR
// Tipos de datos
type Product = {
  id: number;
  name: string;
  price: number;
  shipping: string; // "G" para envío gratuito, otro valor para envío pagado
};

type CartItem = {
  product: Product;
  quantity: number;
};

export const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    { id: 1, name: "Guitarra", price: 1000, shipping: "P" },
    { id: 2, name: "Piano", price: 3000, shipping: "G" },
    { id: 3, name: "Batería", price: 2000, shipping: "P" },
  ];

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingCost = cart.reduce(
      (total, item) => total + (item.product.shipping === "G" ? 0 : 50),
      0
    );
    return subtotal + shippingCost;
  };

  return (
    <div className="app-container">
      <Cart
        cart={cart}
        subtotal={calculateSubtotal()}
        total={calculateTotal()}
      />
    </div>
  );
};
