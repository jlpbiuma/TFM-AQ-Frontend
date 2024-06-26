import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  fetchStationData,
  initializeMqttClient,
  createInitialTopics,
  handleMqttMessage,
} from "../functions/functions";
import Notification from "../utils/Notifications";
import Charts from "../components/common/Charts";

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
        console.log("Initial topics:", initialTopics);
        if (initialTopics.length === 0) {
          Notification.error("No topics found for this station");
          setIsLoading(false);
          return;
        }
        setTopics(initialTopics);
        const client = initializeMqttClient(
          data.ip_local,
          data.topics,
          (topic, message) => {
            handleMqttMessage(topic, message, setTopics, dataSize);
          }
        );
        client.on("error", (error) => {
          console.error("MQTT error:", error);
          Notification("MQTT error", error.message, "error");
        });
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
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleBack}
        >
          Volver
        </button>
        <h1 className="text-3xl font-bold">
          Dashboard for Station {id_estacion}
        </h1>
      </div>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : topics.length === 0 ? (
        <p className="text-center text-gray-500">
          Esta estación no tiene dispositivos que manden información
        </p>
      ) : (
        <Charts topics={topics} handleHistoric={handleHistoric} />
      )}
    </div>
  );
};

export default ViewDashboard;
