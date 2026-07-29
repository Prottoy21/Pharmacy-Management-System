import {
  loginRequest,
  registerRequest,
  meRequest,
} from "./authAPI";

export const loginService = async (data) => {
  const res = await loginRequest(data);

  return res.data.data;
};

export const registerService = async (data) => {
  const res = await registerRequest(data);

  return res.data.data;
};

export const meService = async () => {
  const res = await meRequest();

  return res.data.data;
};