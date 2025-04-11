// src/api/flask.js
export const getEstacionesFromFlask = async () => {
    try {
      const response = await fetch("http://localhost:80/api/estacion");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener estaciones:", error);
      return [];
    }
    
  };