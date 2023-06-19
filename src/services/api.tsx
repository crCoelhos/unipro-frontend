import axios from "axios";
import { UserLoginData, LoginResponse } from "../interfaces/types";

const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

const api = axios.create({
  baseURL: url,
});

export const login = async (data: UserLoginData): Promise<string> => {
  try {
    const response = await api.post<LoginResponse>("/login", data);
    const { token } = response.data;
    return token;
  } catch (error) {
    return "";
  }
};
