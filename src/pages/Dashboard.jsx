import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import API from "../api/estaciones";
import mqtt from "mqtt";
import RechartGraph from "../components/chart/rechart_example";

function ViewDashboard() {
  const { id_estacion } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [pressureData, setPressureData] = useState([]);
  const dataSize = 20;
  const intervalRef = useRef(null);

  useEffect(() => {
    API.get_estacion_by_id_estacion(id_estacion)
      .then((data) => {
        const ip_gateway = data.ip_gateway;
        // TODO: Fetch medidas from API
        const id_medida = 1;
        const client = mqtt.connect(`ws://192.168.0.30:9001`);
        client.on("connect", function () {
          const temperatureTopic = `estacion/${id_estacion}/magnitud/1`;
          const humidityTopic = `estacion/${id_estacion}/magnitud/2`;
          const pressureTopic = `estacion/${id_estacion}/magnitud/3`;
          client.subscribe(temperatureTopic);
          client.subscribe(humidityTopic);
          client.subscribe(pressureTopic);
        });
        client.on("message", function (topic, message) {
          // Update state based on topic
          switch (topic) {
            case `estacion/${id_estacion}/magnitud/1`:
              setTemperatureData((prevData) => [
                ...prevData,
                parseFloat(message),
              ]);
              break;
            case `estacion/${id_estacion}/magnitud/2`:
              setHumidityData((prevData) => [...prevData, parseFloat(message)]);
              break;
            case `estacion/${id_estacion}/magnitud/3`:
              setPressureData((prevData) => [...prevData, parseFloat(message)]);
              break;
            default:
              break;
          }
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id_estacion]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <h1>Dashboard for Station {id_estacion}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        // Render charts
        <div>
          <RechartGraph
            data={temperatureData} // Only show the latest data
            line1Name="Temperature"
            title="Temperature Over Time"
          />
          <RechartGraph
            data={humidityData} // Only show the latest data
            line1Name="Humidity"
            title="Humidity Over Time"
          />
          <RechartGraph
            data={pressureData} // Only show the latest data
            line1Name="Pressure"
            title="Pressure Over Time"
          />
        </div>
      )}
    </div>
  );
}

export default ViewDashboard;
