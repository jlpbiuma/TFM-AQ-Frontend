import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Tem from "../components/chars/grafica_temperatura";
import Hum from "../components/chars/grafica_humedad";
import Car from "../components/chars/grafica_carbono";

function ViewDashboard() {
  const { id_estacion } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [medidas, setMedidas] = useState({});
  const [numCharts, setNumCharts] = useState(0);

  useEffect(() => {
    console.log("Fetching data for station:", id_estacion);
    // Fetch data logic here
   
    setTimeout(() => {
      // Generate a random number from 0 to 15
      const randomNum = Math.floor(Math.random() * 16);
      setNumCharts(randomNum);
      setIsLoading(false); // Update loading state once data is fetched
    }, 1000); // Simulate fetch time

  }, [id_estacion]);

  const handleBack = () => {
    navigate(-1);
  };

  const historical = () => {
    navigate(`/mis-estaciones/${id_estacion}/historico/1`);
  };

  const renderCharts = () => {
    const charts = [];
    const chartComponents = [Tem, Hum, Car]; // Array con los componentes de los gráficos
    for (let i = 0; i < numCharts; i++) {
       // Seleccionar aleatoriamente un componente de gráfico
      const randomIndex = Math.floor(Math.random() * chartComponents.length);
      const ChartComponent = chartComponents[randomIndex];
      charts.push(
        <div key={i} className="chart">
          <ChartComponent />
          <button onClick={historical}
       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
       >Historico</button>
        </div>
      );
    }
    return charts;
  };


  return (
    <div>
      <button onClick={handleBack}
       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       >Back</button>
       <button onClick={historical}
       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
       >Historico</button>
      <h1 className="text-3xl font-bold underline text-gray-800 shadow-lg py-2 text-center">
        Dashboard for Station {id_estacion}
        </h1>
      {isLoading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (// for representacion de chart
        <div className="grid grid-cols-2 gap-4 mt-4">
          {renderCharts()}
        </div>
      )}
    </div>
  );
}

export default ViewDashboard;
