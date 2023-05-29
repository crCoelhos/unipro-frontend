import axios from 'axios';

const url = "http://localhost:3003"; // Corrigido o protocolo para "http" em vez de "https"

interface LoginData {
  user: string; // Alterado de "login" para "user"
  password: string;
}

const authService = {
  login: (username: string, password: string) => {
    const data: LoginData = { user: username, password }; // Alterado de "login" para "user"
    const config = {
      headers: {
        'Access': '123'
      }
    };
    return axios.post(`${url}/auth/login`, data, config); // Adicionado o cabeçalho "Access" na requisição
  }
};

export default authService;
