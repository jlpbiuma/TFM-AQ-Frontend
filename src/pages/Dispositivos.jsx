import Table from "../components/table/Table.jsx";
import { deviceColumns } from "../components/table/columns/deviceColumns";
import { useState, useEffect } from "react";
import API from "../api/dispositivos.js";
import Notifications from "../utils/Notifications.js";
import CreateDeviceForm from "../components/forms/CreateDeviceForm.jsx";

const ViewDispositivos = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    API.get_dispositivos()
      .then((response) => {
        console.log("response", response);
        setDispositivos(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dispositivos:", error);
        Notifications.error("Error fetching dispositivos");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Dispositivos</h1>
      {isLoading ? (
        <div className="text-center">Loading...</div> // Show loading indicator while fetching data
      ) : (
        <>
          <Table
            modalTitle="Crear Dispositivo"
            buttonText="Crear Dispositivo"
            data={dispositivos}
            column={deviceColumns}
            tableContext={"Dispositivos"}
            CreateFormComponent={CreateDeviceForm}
            setData={setDispositivos}
            type="dispositivos"
          />
        </>
      )}
    </div>
  );
};

export default ViewDispositivos;
