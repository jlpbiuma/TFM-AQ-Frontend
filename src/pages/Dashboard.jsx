import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/estaciones";
import mqtt from "mqtt";

function ViewDashboard() {
  const { id_estacion } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [medidas, setMedidas] = useState({});
  const [data, setData] = useState([]);
  const dataSize = 20;
  const intervalRef = useRef(null);

  useEffect(() => {
    console.log("Fetching data for station:", id_estacion);
    API.get_estacion_by_id_estacion(id_estacion)
      .then((data) => {
        console.log("Data fetched:", data);
        const ip_gateway = data.ip_gateway;
        // TODO: Fetch medidas from API
        const id_medida = 1;
        const client = mqtt.connect(`ws://192.168.0.30:9001`);
        client.on("connect", function () {
          console.log("Connected to MQTT broker");
          const topic = `estacion/${id_estacion}/magnitud/+`;
          client.subscribe(topic);
          console.log("Subscribed to topic:", topic);
        });
        client.on("message", function (topic, message) {
          console.log("Received MQTT message:", message.toString());
          // Update state or perform other logic with MQTT message
        });
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
        // Render medidas or other component logic here
        <div>
          <RechartGraph
            data={data}
            line1Name="Temperature"
            line2Name="Humidity"
            title="Weather Data Over Time"
          />
        </div>
      )}
    </div>
  );
}

export default ViewDashboard;
