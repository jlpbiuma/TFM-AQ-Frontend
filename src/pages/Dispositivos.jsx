import Table from "../components/table/Table.jsx";
import { deviceColumns } from "../components/table/columns/deviceColumns";
import { DATA2 } from "../data/MOCK_DATA-2";
import { useState, useEffect } from "react";
import API from "../api/dispositivos.js";
import Notifications from "../utils/Notifications.js";

const columna = [
  { id: 1, header: "APELLIDO", accessorKey: "apellidos" },
  { id: 2, header: "NAME", accessorKey: "name" },
];
const data = [
  {
    name: "Joseph",
    apellidos: "Vento",
    edad: 23,
  },
  {
    name: "Jose Luis",
    apellidos: "Pordomingo",
    edad: 23,
  },
];

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
            data={dispositivos}
            column={deviceColumns}
            tableContext={"Dispositivos"}
          />
          {/* <Table data={data} column={columna} tableContext={"Dispositivos"} /> */}
        </>
      )}
    </div>
  );
};

export default ViewDispositivos;
