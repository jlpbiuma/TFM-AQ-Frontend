import { customAxios } from "./api";

async function login({ username, password }) {
  try {
    const { data } = await customAxios.post("/auth/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
}

async function register({ username, name, email, password, phone }) {
  const { data } = await customAxios.post("/auth/register", {
    username: username,
    name: name,
    email: email,
    password: password,
    phone: phone,
  });
  console.log(data);
  return data;
}

async function forgotPassword(email) {
  const { data } = await customAxios.post("/auth/forgot-password", {
    email: email,
  });
  return data;
}

async function resetPassword({ token, password }) {
  const { data } = await customAxios.post("/auth/reset-password", {
    token: token,
    password: password,
  });
  return data;
}

export default { login, register, forgotPassword, resetPassword };
