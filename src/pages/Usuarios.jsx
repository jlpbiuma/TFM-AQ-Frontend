import Table from "../components/table/Table.jsx";
import { userColumns } from "../components/table/columns/userColumns";
import { DATA } from "../data/MOCK_DATA";
import { useState, useEffect } from "react";
import API from "../api/usuarios.js";

const ViewUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    API.get_usuarios()
      .then((response) => {
        console.log("response", response);
        setUsuarios(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching usuarios:", error);
        Notifications.error("Error fetching usuarios");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Usuarios</h1>
      {isLoading ? (
        <div className="text-center">Loading...</div> // Show loading indicator while fetching data
      ) : (
        <Table data={usuarios} column={userColumns} />
      )}
    </div>
  );
};

export default ViewUsuarios;
