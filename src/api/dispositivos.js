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

export default {
  get_dispositivos,
};
