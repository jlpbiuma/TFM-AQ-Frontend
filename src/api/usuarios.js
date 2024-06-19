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

export default { get_usuarios, delete_usuario, create_usuario, update_usuario };
