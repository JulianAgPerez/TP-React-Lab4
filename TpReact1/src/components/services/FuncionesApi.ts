import { PreferenceMp } from "../../types/types";

let url= "http://localhost:8080/"   //defino url base
export async function createPreferenceMp(idPedido: number) {
    const response = await fetch(url+"instrumentos/productos/create_preference_mp",{
        "method": "POST",
        "body": JSON.stringify(idPedido),
        "headers":{
            "Content-type" : "application/json"
        }
    })
    return await response.json() as PreferenceMp;
}