import { customAxios } from "./api";

async function login({ username, password }) {
  const { data } = await customAxios.post("/api/auth/login", {
    username: username,
    password: password,
  });
  return data;
}

async function register({ username, name, email, password, phone }) {
  const { data } = await customAxios.post("/api/auth/register", {
    username: username,
    name: name,
    email: email,
    password: password,
    phone: phone,
  });
  console.log(data);
  return data;
}

export default { login, register };
