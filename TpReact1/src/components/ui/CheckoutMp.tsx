import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import React, { useState } from "react";
import { PreferenceMp } from "../../types/types";

export const CheckoutMp = () => {
  const [idPreference, setIdPreference] = useState<string>("");

  const getPreferenceMP = async () => {
    if (montoCarrito > 0) {
      const response: PreferenceMp = await createPreferenceMP({
        id: 0,
        titulo: "Pedido Musical Hendrix",
        montoTotal: montoCarrito,
      });
      console.log("Preference id: " + response.id);
      if (response) setIdPreference(response.id);
    } else {
      alert("Agregue al menos un instrumento al carrito");
    }
  };

  initMercadoPago("TEST-423c43af-d3f4-44bd-b225-b6ecf502d987", {
    locale: "es-AR",
  }); //crendencial de prueba
  return (
    <>
      <div>CheckoutMp</div>
      <button onClick={getPreferenceMP} className="btMercadoPago">
        COMPRAR con <br></br> Mercado Pago
      </button>
      <div className={idPreference ? "divVisible" : "divInvisible"}>
        <Wallet
          initialization={{ preferenceId: "<PREFERENCE_ID>" }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      </div>
    </>
  );
};
