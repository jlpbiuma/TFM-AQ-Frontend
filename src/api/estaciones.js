import { customAxios } from "./api";

async function get_estaciones() {
  const { data } = await customAxios.get("/api/estacion");
  return data;
}

async function get_estaciones_by_user(id_usuario) {
  const { data } = await customAxios.get(
    "/api/estacion/usuario/mis-estaciones/" + id_usuario
  );
  return data;
}

export default { get_estaciones, get_estaciones_by_user };
