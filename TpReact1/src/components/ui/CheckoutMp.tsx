import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import React, { useEffect, useState } from "react";
import { PreferenceMp } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { createPreferenceMp } from "../services/FuncionesApi";

interface CheckoutMpProps {
  visible: boolean;
}

export const CheckoutMp: React.FC<CheckoutMpProps> = ({ visible }) => {
  const pedido = useSelector((state: RootState) => state.pedido.pedidoActual);
  const items = useSelector((state: RootState) => state.cart.items);
  const [idPreference, setIdPreference] = useState<string>("");

  const getPreferenceMP = async () => {
    if (items.length > 0) {
      const response: PreferenceMp = await createPreferenceMp(pedido);
      console.log("Response: ", response);
      console.log("Response id: ", response.id);
      console.log(pedido);
      if (response) setIdPreference(response.id!);
    } else {
      alert("Agregue al menos un instrumento al carrito");
    }
  };
  useEffect(() => {
    if (visible) {
      getPreferenceMP();
    }
  }, []);

  initMercadoPago("TEST-423c43af-d3f4-44bd-b225-b6ecf502d987", {
    locale: "es-AR",
  }); //crendencial de prueba
  return (
    <>
      <Wallet
        initialization={{ preferenceId: idPreference }}
        customization={{ texts: { valueProp: "smart_option" } }}
      />
    </>
  );
};
