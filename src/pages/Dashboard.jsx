import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import RechartGraph from "../components/chart/rechart_example";
import {
  fetchStationData,
  initializeMqttClient,
  createInitialTopics,
  handleMqttMessage,
} from "../functions/functions";

const ViewDashboard = () => {
  const { id_estacion } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const dataSize = 50;
  const clientRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStationData(id_estacion);
        const initialTopics = createInitialTopics(data);
        console.log("Data loaded:", data);
        setTopics(initialTopics);
        const client = initializeMqttClient(
          data.ip_local,
          data.topics,
          (topic, message) => {
            handleMqttMessage(topic, message, setTopics, dataSize);
          }
        );
        clientRef.current = client;
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();

    return () => {
      if (clientRef.current) {
        clientRef.current.end();
        console.log("Disconnected from MQTT broker");
      }
    };
  }, [id_estacion]);

  const handleBack = () => {
    if (clientRef.current) {
      clientRef.current.end();
      console.log("Disconnected from MQTT broker");
    }
    navigate(-1);
  };

  // Handle historic button and send to /mis-estaciones/id_estacion/dashboard/id_magnitud_selected/historico
  const handleHistoric = (id_magnitud) => {
    navigate(
      `/mis-estaciones/${id_estacion}/dashboard/${id_magnitud}/historico`
    );
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <h1>Dashboard for Station {id_estacion}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {topics.map((topic) => (
            <>
              <RechartGraph
                key={topic.id_magnitud}
                data={topic.data}
                title={topic.descripcion}
                line1Name={topic.magnitud}
              />
              <button
                className="bg"
                onClick={() => handleHistoric(topic.id_magnitud)}
              >
                Ver histórico
              </button>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewDashboard;
