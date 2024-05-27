// Estacion.jsx
import { useNavigate } from "react-router-dom";

const Estacion = ({ estacion, onEdit, onDelete }) => {
  const navigate = useNavigate();
  return (
    <li className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{estacion.nombre}</h2>
      <p className="mt-2 text-gray-600">{estacion.localizacion}</p>
      <button
        onClick={() => onEdit(estacion)}
        className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update
      </button>
      <button
        onClick={() =>
          onDelete({
            id: estacion.id,
            nombre: estacion.nombre,
          })
        }
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
      <button
        onClick={() => navigate(`/estaciones/${estacion.id}`)}
        className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
      >
        Ver
      </button>
    </li>
  );
};

export default Estacion;
