import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import API from "../api/medidas.js";
import medidas from "../api/medidas.js";
import RechartGraph from "../components/chart/rechart_example.jsx";
import * as d3 from "d3";

const generateRandomValue = (mean, std) => {
  return mean + std * d3.randomNormal()();
};

function ViewDashboard() {
  const { id_estacion } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [medidas, setMedidas] = useState({});
  const [data, setData] = useState([]);
  const dataSize = 20;
  const intervalRef = useRef(null);

  useEffect(() => {
    // Initialize the data array with a few initial points
    let initialData = [];
    for (let i = 0; i < dataSize; i++) {
      initialData.push({
        time: new Date().toLocaleTimeString(),
        line1: generateRandomValue(25, 1),
        line2: generateRandomValue(35, 2),
      });
    }
    setData(initialData);

    intervalRef.current = setInterval(() => {
      setData((oldData) => {
        const newData1 = generateRandomValue(25, 1);
        const newData2 = generateRandomValue(35, 2);
        const newTimestamp = new Date().toLocaleTimeString();

        const updatedData = [
          ...oldData.slice(1),
          { time: newTimestamp, line1: newData1, line2: newData2 },
        ];

        return updatedData;
      });
    }, 1000); // Update every 1000ms for smoother animation

    return () => clearInterval(intervalRef.current);
  }, []);

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
