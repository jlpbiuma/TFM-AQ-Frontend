import { useState, useEffect } from "react";
import Notifications from "../../utils/Notifications.js";
import API from "../../api/estaciones.js";

const CreateEstacionForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [estacion, setEstacion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEstacion({ nombre: name, localizacion: location });
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (estacion) {
      API.create_estacion(estacion)
        .then((response) => {
          console.log("Estacion created successfully:", response);
          Notifications.success("Estacion created successfully");
          onCreate(response);
        })
        .catch((error) => {
          console.error("Error creating estacion:", error);
          Notifications.error("Error creating estacion");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }, [estacion]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="location">
          Location
        </label>
        <input
          id="location"
          type="text"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => onCreate(null)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default CreateEstacionForm;
