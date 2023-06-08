import axios from 'axios';
import { LoginData } from '../types';

const url = "http://localhost:3003";



const authService = {
  login: (username: string, password: string) => {
    const data: LoginData = { user: username, password };
    const config = {
      headers: {
        'Access': '123'
      }
    };
    return axios.post(`${url}/auth/login`, data, config);
  }
};

export default authService;
