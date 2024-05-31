import { customAxios } from "./api";

async function get_dispositivos(per_page = 10, page = 1) {
  const { data } = await customAxios.get("/dispositivo", {
    params: {
      per_page,
      page,
    },
  });
  return data;
}

async function create_dispositivo(
  id_estacion,
  name,
  location,
  selectedMagnitudes
) {
  console.log("id_estacion", id_estacion);
  console.log("name", name);
  console.log("location", location);
  console.log("selectedMagnitudes", selectedMagnitudes);
  const { data } = await customAxios.post("/dispositivo/create", {
    nombre: name,
    localizacion: location,
    id_estacion: id_estacion,
    magnitudes: selectedMagnitudes,
  });
  return data;
}

export default {
  get_dispositivos,
  create_dispositivo,
};
