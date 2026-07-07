import { Categoria, Instrumento } from "../types/types";
import {
  mockCategorias,
  mockUsuarios,
  generateMockInstrumentos,
  mockDataPorMesYAnio,
  mockDataPorInstrumento,
  UsuarioMock,
} from "./mockData";

let instrumentos = generateMockInstrumentos();
let categorias: Categoria[] = [...mockCategorias];
let usuarios: UsuarioMock[] = [...mockUsuarios];
let nextId = 11;
let nextPedidoId = 1;

function jsonResponse(data: unknown, status = 200) {
  const body = JSON.stringify(data);
  return new Response(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function getBody(init: RequestInit | undefined): any {
  if (!init || !init.body) return {};
  try {
    return JSON.parse(init.body as string);
  } catch {
    return {};
  }
}

export function setupMockFetch() {
  const originalFetch = window.fetch.bind(window);

  window.fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;

    const method = init?.method?.toUpperCase() ?? "GET";

    const handled = tryMock(url, method, init);
    if (handled) return handled;
    return originalFetch(input, init);
  };
}

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function tryMock(
  url: string,
  method: string,
  init?: RequestInit
): Promise<Response> | null {
  // --- AUTH ---

  if (url.endsWith("/login") && method === "POST") {
    return (async () => {
      await delay();
      const { nombreUsuario, clave } = getBody(init);
      const user = usuarios.find(
        (u) => u.nombreUsuario === nombreUsuario && u.clave === clave
      );
      if (!user) {
        return jsonResponse({ error: "Credenciales inválidas" }, 401);
      }
      return jsonResponse({
        nombreUsuario: user.nombreUsuario,
        rol: user.rol,
      });
    })();
  }

  if (url.endsWith("/register") && method === "POST") {
    return (async () => {
      await delay();
      const { nombreUsuario, clave, rol } = getBody(init);
      usuarios.push({ nombreUsuario, clave, rol });
      return jsonResponse({ nombreUsuario, rol });
    })();
  }

  // --- CATEGORIAS ---

  if (url.endsWith("/instrumentos/categorias") && method === "GET") {
    return (async () => {
      await delay();
      return jsonResponse(categorias);
    })();
  }

  // --- PRODUCTOS ---

  if (
    url.includes("/instrumentos/productos") &&
    !url.includes("/create_preference_mp") &&
    method === "GET"
  ) {
    return (async () => {
      await delay();
      const idMatch = url.match(/\/instrumentos\/productos\/(\d+)$/);
      if (idMatch) {
        const id = parseInt(idMatch[1], 10);
        const prod = instrumentos.find((i) => i.id === id);
        return jsonResponse(prod ?? null);
      }
      return jsonResponse(instrumentos);
    })();
  }

  if (
    url.includes("/instrumentos/productos") &&
    !url.includes("/create_preference_mp") &&
    method === "POST"
  ) {
    return (async () => {
      await delay();
      const body = getBody(init);
      const newInstrumento: Instrumento = {
        ...body,
        id: nextId++,
        baja: false,
      };
      instrumentos.push(newInstrumento);
      return jsonResponse(newInstrumento, 201);
    })();
  }

  const patchMatch = url.match(/\/instrumentos\/productos\/(\d+)$/);
  if (patchMatch && method === "PATCH") {
    return (async () => {
      await delay();
      const id = parseInt(patchMatch[1], 10);
      const idx = instrumentos.findIndex((i) => i.id === id);
      if (idx === -1) return jsonResponse({ error: "Not found" }, 404);
      instrumentos[idx] = { ...instrumentos[idx], ...getBody(init) };
      return jsonResponse(instrumentos[idx]);
    })();
  }

  if (patchMatch && method === "DELETE") {
    return (async () => {
      await delay();
      const id = parseInt(patchMatch[1], 10);
      const idx = instrumentos.findIndex((i) => i.id === id);
      if (idx === -1) return jsonResponse({ error: "Not found" }, 404);
      instrumentos[idx] = { ...instrumentos[idx], baja: true };
      return jsonResponse({ mensaje: "Eliminado" });
    })();
  }

  // --- PEDIDOS ---

  if (url.endsWith("/api/pedidos/crear") && method === "POST") {
    return (async () => {
      await delay();
      const id = nextPedidoId++;
      return jsonResponse({
        idPedido: id,
        mensaje: `Pedido #${id} creado correctamente`,
      });
    })();
  }

  if (url.includes("/api/pedidos/contar-por-mes-anio") && method === "GET") {
    return (async () => {
      await delay();
      return jsonResponse(mockDataPorMesYAnio);
    })();
  }

  if (url.includes("/api/pedidos/contar-por-instrumento") && method === "GET") {
    return (async () => {
      await delay();
      return jsonResponse(mockDataPorInstrumento);
    })();
  }

  // --- MERCADO PAGO ---

  if (url.includes("/create_preference_mp") && method === "POST") {
    return (async () => {
      await delay();
      const body = getBody(init);
      const id = typeof body === "number" ? body : nextPedidoId;
      return jsonResponse({ id: `mock_pref_${id}`, statusCode: 201 });
    })();
  }

  // --- REPORTE EXCEL ---

  if (url.includes("/api/reporte") && method === "GET") {
    return (async () => {
      await delay();
      const csvRows = [
        ["Instrumento", "Cantidad", "Precio", "Fecha"],
        ["Mandolina Stagg", "2", "2450", "2024-01-15"],
        ["Teclado GADNIC", "1", "2250", "2024-01-20"],
      ];
      const csv = csvRows.map((r) => r.join(",")).join("\n");
      return new Response(csv, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.ms-excel",
          "Content-Disposition": 'attachment; filename="reporte_pedidos.xlsx"',
        },
      });
    })();
  }

  return null;
}
