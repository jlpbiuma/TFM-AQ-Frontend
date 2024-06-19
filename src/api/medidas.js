import { customAxios } from "./api";

async function get_medidas_by_id_estacion_magnitud(
  id_estacion,
  id_magnitud,
  start_date,
  end_date
) {
  const { data } = await customAxios.get(
    `/medida/estacion/${id_estacion}/magnitud/${id_magnitud}`,
    {
      params: {
        start_date,
        end_date,
      },
    }
  );
  return data;
}

export default {
  get_medidas_by_id_estacion_magnitud,
};
