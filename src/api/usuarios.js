import { customAxios } from "./api";

async function get_usuarios(per_page = 10, page = 1) {
  const { data } = await customAxios.get("/usuario", {
    params: {
      per_page,
      page,
    },
  });
  return data;
}

export default { get_usuarios };
