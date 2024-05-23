import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ViewDashboard() {
  const { id_estacion } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [medidas, setMedidas] = useState({});

  useEffect(() => {
    console.log("Fetching data for station:", id_estacion);
    // Fetch data logic here
    setIsLoading(false); // Update loading state once data is fetched
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
        <div>{/* Data rendering logic */}</div>
      )}
    </div>
  );
}

export default ViewDashboard;
