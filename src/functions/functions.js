import API from "../api/estaciones";
import mqtt from "mqtt";

export const fetchStationData = async (id_estacion) => {
  try {
    const data = await API.get_estacion_by_id_estacion(id_estacion);
    console.log("Data fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const initializeMqttClient = (ip_local, topics, onMessageCallback) => {
  const client = mqtt.connect(`ws://${ip_local}:9001`);
  client.on("connect", () => {
    const str_topics = topics.map((topic) => topic.topic_str);
    client.subscribe(str_topics, (err) => {
      if (err) {
        console.error("Subscription error:", err);
      }
    });
  });
  client.on("message", onMessageCallback);
  return client;
};

export const createInitialTopics = (data) => {
  const result = data.topics.map((topic, index) => ({
    id_magnitud: index + 1,
    topic: topic.topic_str,
    descripcion: topic.magnitud.descripcion,
    magnitud: topic.magnitud.magnitud,
    escala: topic.magnitud.escala,
    data: [],
  }));
  return result;
};

export const handleMqttMessage = (topic, message, setTopics, dataSize) => {
  const dataPoint = parseFloat(message);
  const timeStamp = new Date().toLocaleTimeString();
  const topicNumber = parseInt(topic.match(/\d+$/)[0]);
  setTopics((prevTopics) => {
    const topicIndex = prevTopics.findIndex(
      (t) => t.id_magnitud === topicNumber
    );
    if (topicIndex === -1) return prevTopics;

    const newTopicData = [
      ...prevTopics[topicIndex].data,
      { time: timeStamp, line1: dataPoint },
    ];
    if (newTopicData.length > dataSize) {
      newTopicData.shift();
    }

    const newTopics = [...prevTopics];
    newTopics[topicIndex] = {
      ...newTopics[topicIndex],
      data: newTopicData,
    };
    return newTopics;
  });
};
