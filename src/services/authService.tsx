import axios from 'axios';

const url = "https://localhost:3003";

interface LoginData {
  login: string;
  password: string;
}

const authService = {
  login: (username: string, password: string) => {
    const data: LoginData = { login: username, password };
    return axios.post(`${url}/auth/login`, data);
  }
};

export default authService;