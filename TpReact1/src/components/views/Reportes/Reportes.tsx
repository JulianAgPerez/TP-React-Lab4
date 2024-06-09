import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useFetch } from "../../../Hooks/useFetch";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6666",
  "#6A5ACD",
  "#7B68EE",
  "#20B2AA",
  "#FF6347",
  "#FFD700",
];

const Reportes = () => {
  const urlMesYAnio = `/api/pedidos/contar-por-mes-anio?mes=${5}&anio=${2024}`;

  /*
  const {
    data: dataPorMesYAnio,
    loading: loadingMesYAnio,
    error: errorMesYAnio,
  } = useFetch(urlMesYAnio);
   */
  const {
    data: dataPorInstrumento,
    loading: loadingInstrumento,
    error: errorInstrumento,
  } = useFetch("/api/pedidos/contar-por-instrumento");
  /*
  if (loadingMesYAnio || loadingInstrumento) {
    return <div>Cargando...</div>;
  }

  if (errorMesYAnio || errorInstrumento) {
    return (
      <div>Error: {errorMesYAnio?.message || errorInstrumento?.message}</div>
    );
  }
    */
  //console.log("data: ", dataPorMesYAnio);
  console.log("data instrumento: ", dataPorInstrumento);
  if (!dataPorInstrumento) {
    return "Data de instrumento nulo";
  }
  const transformedData = dataPorInstrumento.map((entry: any) => ({
    instrumento: entry[1].instrumento, // Suponemos que el nombre del instrumento está en la segunda posición
    count: entry[0], // Suponemos que la cantidad está en la primera posición
  }));

  console.log("data instrumento transformado: ", transformedData);
  return (
    <div>
      <h2>Reportes</h2>

      {/* Gráfico de barras para count por mes y año 

      <h3>Count por mes y año</h3>
      <BarChart width={600} height={300} data={dataPorMesYAnio}>
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cantidad" fill="#8884d8" />
      </BarChart>

      {/* Gráfico de torta para count por instrumento */}
      <h3>Count por instrumento</h3>
      <PieChart width={600} height={400}>
        <Pie
          data={transformedData!}
          dataKey="count"
          nameKey="instrumento"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {transformedData.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Reportes;
