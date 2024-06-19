import { customAxios } from "./api";

async function get_dispositivos(per_page = 999999999, page = 1) {
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
  const { data } = await customAxios.post("/dispositivo/create", {
    name: name,
    location: location,
    id_estacion: id_estacion,
    magnitudes: selectedMagnitudes,
  });
  return data;
}

async function delete_dispositivo(id_dispositivo) {
  const { data } = await customAxios.delete("/dispositivo/" + id_dispositivo);
  console.log("data", data);
  return data;
}

async function update_dispositivo(
  id_dispositivo,
  name,
  location,
  selectedMagnitudes
) {
  const { data } = await customAxios.put("/dispositivo/" + id_dispositivo, {
    nombre: name,
    localizacion: location,
    magnitudes: selectedMagnitudes,
  });
  return data;
}

export default {
  get_dispositivos,
  create_dispositivo,
  delete_dispositivo,
  update_dispositivo,
};
