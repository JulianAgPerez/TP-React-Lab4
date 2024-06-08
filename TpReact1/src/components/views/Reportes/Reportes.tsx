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

const Reportes = () => {
  const { data: dataPorMesYAnio } = useFetch(
    "/api/pedidos/countbymonthandyear"
  );
  const { data: dataPorInstrumento } = useFetch(
    "/api/pedidos/countbyinstrumento"
  );

  return (
    <div>
      <h2>Reportes</h2>

      {/* Gráfico de barras para count por mes y año */}
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
      <PieChart width={400} height={400}>
        <Pie
          data={dataPorInstrumento}
          dataKey="count"
          nameKey="instrumento"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {dataPorInstrumento &&
            dataPorInstrumento.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${index + 1}2bca`} />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Reportes;
