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
  Label,
} from "recharts";
import { useFetch } from "../../../Hooks/useFetch";
import { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./Reportes.module.css";

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [anio, setAnio] = useState(selectedDate.getFullYear());
  const [mes, setMes] = useState(selectedDate.getMonth() + 1);
  const [fechaDesde, setFechaDesde] = useState("2024-01-01");
  const obtenerFechaActual = () => new Date().toISOString().slice(0, 10);

  const [fechaHasta, setFechaHasta] = useState(obtenerFechaActual);

  const urlMesYAnio = `/api/pedidos/contar-por-mes-anio?mes=${mes}&anio=${anio}`;
  const {
    data: dataPorMesYAnio,
    loading: loadingMesYAnio,
    error: errorMesYAnio,
  } = useFetch(urlMesYAnio);

  const {
    data: dataPorInstrumento,
    loading: loadingInstrumento,
    error: errorInstrumento,
  } = useFetch("/api/pedidos/contar-por-instrumento");

  if (loadingMesYAnio || loadingInstrumento) {
    return <div>Cargando...</div>;
  }

  if (errorMesYAnio || errorInstrumento) {
    return (
      <div>Error: {errorMesYAnio?.message || errorInstrumento?.message}</div>
    );
  }

  const transformedDataFecha = dataPorMesYAnio!.map((entry: any) => ({
    dia: entry[0],
    cantidad: entry[1],
  }));

  const transformedData = dataPorInstrumento!.map((entry: any) => ({
    instrumento: entry[1].instrumento,
    count: entry[0],
  }));

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setSelectedDate(date);
    setAnio(date.getFullYear());
    setMes(date.getMonth() + 1);
  };

  const handleFechaDesdeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFechaDesde(event.target.value);
  };

  const handleFechaHastaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFechaHasta(event.target.value);
  };

  const handleDownloadExcel = async () => {
    try {
      const urlServer = `http://localhost:8080/api/reporte?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`;
      const response = await fetch(urlServer, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reporte_pedidos.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

  return (
    <div className={styles.centerContent}>
      <h1 className={styles.centerContentMargin}>
        Reportes
        <h3 className={styles.spacing}>
          Generar reportes desde hasta
          <input
            className={styles.inputSpacing}
            type="date"
            value={fechaDesde}
            onChange={handleFechaDesdeChange}
          />
          <input
            className={styles.inputSpacing}
            type="date"
            value={fechaHasta}
            onChange={handleFechaHastaChange}
          />
        </h3>
        <Button onClick={handleDownloadExcel}>Descargar excel</Button>
      </h1>

      <h3>
        Cantidad de pedidos por día en la fecha {selectedDate.getFullYear()}/
        {selectedDate.getMonth() + 2}
      </h3>
      <h3>
        <input
          type="month"
          value={`${anio}-${String(mes).padStart(2, "0")}`}
          onChange={handleDateChange}
        />
      </h3>

      <BarChart width={600} height={300} data={transformedDataFecha}>
        <XAxis dataKey="dia">
          <Label value="Día" position="insideBottom" offset={-5} />
        </XAxis>
        <YAxis>
          <Label value="Pedidos" angle={-90} position="insideLeft" offset={7} />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="cantidad" fill="#8884d8" />
      </BarChart>

      <h3>Instrumentos mas vendidos</h3>
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
