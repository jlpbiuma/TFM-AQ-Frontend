import { customAxios } from "./api";

async function get_posibles_magnitudes() {
  const { data } = await customAxios.get("/magnitud/posibles");
  console.log(data);
  return data;
}

export default {
  get_posibles_magnitudes,
};
