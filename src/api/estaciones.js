import { customAxios } from "./api";

async function get_estaciones() {
  const { data } = await customAxios.get("/estacion");
  return data;
}

async function get_estaciones_by_user(id_usuario) {
  const { data } = await customAxios.get(
    "/estacion/usuario/mis-estaciones/" + id_usuario
  );
  return data;
}

async function create_estacion({ nombre, localizacion }) {
  console.log("nombre", nombre);
  console.log("localizacion", localizacion);
  const { data } = await customAxios.post("/estacion/create", {
    nombre: nombre,
    localizacion: localizacion,
    id_administrador: 1,
  });
  return data;
}

async function update_estacion({ id, nombre, localizacion }) {
  const { data } = await customAxios.put("/estacion/" + id, {
    nombre: nombre,
    localizacion: localizacion,
  });
  return data;
}

async function delete_estacion(id) {
  const { data } = await customAxios.delete("/estacion/" + id);
  return data;
}

async function get_usuario_by_id_estacion(id_estacion) {
  const { data } = await customAxios.get("/estacion/usuario/" + id_estacion);
  return data;
}

export default {
  get_estaciones,
  get_estaciones_by_user,
  create_estacion,
  update_estacion,
  delete_estacion,
  get_usuario_by_id_estacion,
};
