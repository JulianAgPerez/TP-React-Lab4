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
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
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
  const mes = 5;
  const anio = 2024;
  const urlMesYAnio = `/api/pedidos/contar-por-mes-anio?mes=${mes}&anio=${anio}`;
  const [selectedDate, setSelectedDate] = useState(new Date());
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
  // Transformar los datos de cantidad por mes y año para el gráfico de barras
  const transformedDataFecha = dataPorMesYAnio!.map((entry: any) => ({
    dia: entry[0],
    cantidad: entry[1],
  }));
  console.log("data de cantidad en mes y año: ", dataPorMesYAnio);
  console.log("Data transormada de fecha: ", transformedDataFecha);
  console.log("data instrumento: ", dataPorInstrumento);

  const transformedData = dataPorInstrumento!.map((entry: any) => ({
    instrumento: entry[1].instrumento, // Suponemos que el nombre del instrumento está en la segunda posición
    count: entry[0], // Suponemos que la cantidad está en la primera posición
  }));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Aquí puedes realizar acciones adicionales con la fecha seleccionada
  };
  const handleDowloadExcel = async () => {
    try {
      let urlServer =
        "http://localhost:8080/api/reporte?fechaDesde=2023-01-01&fechaHasta=2024-12-31";
      const response = await fetch(urlServer, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Aquí puedes manejar la respuesta, por ejemplo, descargar el archivo
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
      <h2>
        Reportes <Button onClick={handleDowloadExcel}>Descargar excel</Button>
      </h2>

      {/* Gráfico de barras para count por mes y año */}

      <h3>
        Cantidad de pedidos por día en la fecha {selectedDate.getFullYear()}/
        {selectedDate.getMonth() + 1}
        {/** puedo agregar un componente que incremente o decremente el año y luego hacer la busqueda */}
        <DatePicker
          onChange={handleDateChange}
          value={selectedDate}
          format="MM/yyyy"
          calendarIcon={null} // Oculta el ícono del calendario
          clearIcon={null} // Oculta el ícono para borrar la fecha
          maxDetail="year" // Muestra solo año y mes
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
