import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

async function getInfo() {
  const { data } = await customAxios.get("/api/info");
  return data;
}

export { getInfo };
