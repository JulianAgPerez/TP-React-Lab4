import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import React, { useState } from "react";
import { PreferenceMp } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { createPreferenceMp } from "../services/FuncionesApi";

export const CheckoutMp = () => {
  const pedido = useSelector((state: RootState) => state.pedido.pedidoActual);
  const items = useSelector((state: RootState) => state.cart.items);
  const [idPreference, setIdPreference] = useState<string>("");

  const getPreferenceMP = async () => {
    if (items.length > 0) {
      const response: PreferenceMp = await createPreferenceMp(pedido);
      console.log("Preference id: " + response.id);
      console.log(pedido);
      if (response) setIdPreference(response.id!);
    } else {
      alert("Agregue al menos un instrumento al carrito");
    }
  };

  initMercadoPago("TEST-423c43af-d3f4-44bd-b225-b6ecf502d987", {
    locale: "es-AR",
  }); //crendencial de prueba
  return (
    <>
      <button onClick={getPreferenceMP} className="btMercadoPago">
        COMPRAR con <br></br> Mercado Pago
      </button>
      <div className={idPreference ? "divVisible" : "divInvisible"}>
        <Wallet
          initialization={{ preferenceId: idPreference }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      </div>
    </>
  );
};
