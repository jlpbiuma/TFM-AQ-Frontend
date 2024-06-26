import { customAxios } from "./api";

async function get_usuarios(per_page = 1000, page = 1) {
  const { data } = await customAxios.get("/usuario", {
    params: {
      per_page,
      page,
    },
  });
  return data;
}

async function create_usuario(usuario) {
  const { data } = await customAxios.post("/usuario/create", usuario);
  return data;
}

async function update_usuario(id_usuario, usuario, token) {
  const { data } = await customAxios.put("/usuario/" + id_usuario, usuario, {
    headers: {
      Authorization: token,
    },
  });
  return data;
}

async function delete_usuario(id_usuario) {
  const { data } = await customAxios.delete("/usuario/" + id_usuario);
  return data;
}

async function get_usuario_by_id_estacion(id_estacion) {
  const { data } = await customAxios.get("/estacion/usuario/" + id_estacion);
  return data;
}

async function get_usuarios_no_id_estacion(id_estacion) {
  const { data } = await customAxios.get(
    "/estacion/usuario/no-estacion/" + id_estacion
  );
  return data;
}

async function link_usuarios_by_id_estacion(id_estacion, ids_usuarios) {
  const { data } = await customAxios.post("/estacion/usuario/" + id_estacion, {
    ids_usuarios: ids_usuarios,
  });
  return data;
}

async function delete_link_usuario_from_estacion_by_id_usuario_id_estacion(
  id_estacion,
  id_usuario
) {
  const { data } = await customAxios.delete(
    "/estacion/usuario/" + id_estacion + "/usuario/" + id_usuario
  );
  return data;
}

export default {
  get_usuarios,
  delete_usuario,
  create_usuario,
  update_usuario,
  get_usuario_by_id_estacion,
  get_usuarios_no_id_estacion,
  link_usuarios_by_id_estacion,
  delete_link_usuario_from_estacion_by_id_usuario_id_estacion,
};
