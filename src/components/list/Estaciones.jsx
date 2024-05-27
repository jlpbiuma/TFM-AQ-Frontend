// Estaciones.jsx
import Estacion from "./Estacion";

const Estaciones = ({ estaciones, onEdit, onDelete }) => {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {estaciones.map((estacion) => (
        <Estacion
          estacion={estacion}
          key={estacion.id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default Estaciones;
