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

  useEffect(() => {
    API.get_estacion_by_id_estacion(id_estacion)
      .then((data) => {
        const ip_gateway = data.ip_gateway;
        // Initialize MQTT client
        const client = mqtt.connect(`ws://192.168.0.30:9001`);

        // Subscribe to MQTT topics
        const temperatureTopic = `estacion/${id_estacion}/magnitud/1`;
        const humidityTopic = `estacion/${id_estacion}/magnitud/2`;
        const pressureTopic = `estacion/${id_estacion}/magnitud/3`;

        client.on("connect", function () {
          console.log("Connected to MQTT broker");
          client.subscribe([temperatureTopic, humidityTopic, pressureTopic]);
        });

        // Handle MQTT messages
        client.on("message", function (topic, message) {
          // Convert message to float
          const dataPoint = parseFloat(message);
          const timeStamp = new Date().toLocaleTimeString();
          switch (topic) {
            case temperatureTopic:
              setTemperatureData((prevData) => {
                const updatedData = [
                  ...prevData,
                  {
                    time: timeStamp,
                    line1: dataPoint,
                  },
                ];
                return updatedData.length > dataSize
                  ? updatedData.slice(-dataSize)
                  : updatedData;
              });
              break;
            case humidityTopic:
              setHumidityData((prevData) => {
                const updatedData = [
                  ...prevData,
                  {
                    time: timeStamp,
                    line1: dataPoint,
                  },
                ];
                return updatedData.length > dataSize
                  ? updatedData.slice(-dataSize)
                  : updatedData;
              });
              break;
            case pressureTopic:
              setPressureData((prevData) => {
                const updatedData = [
                  ...prevData,
                  {
                    time: timeStamp,
                    line1: dataPoint,
                  },
                ];
                return updatedData.length > dataSize
                  ? updatedData.slice(-dataSize)
                  : updatedData;
              });
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

    return () => {
      // Clean up MQTT client
      client.end();
    };
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
            data={temperatureData}
            line1Name="Temperature"
            title="Temperature Over Time"
          />
          <RechartGraph
            data={humidityData}
            line1Name="Humidity"
            title="Humidity Over Time"
          />
          <RechartGraph
            data={pressureData}
            line1Name="Pressure"
            title="Pressure Over Time"
          />
        </div>
      )}
    </div>
  );
}

export default ViewDashboard;
