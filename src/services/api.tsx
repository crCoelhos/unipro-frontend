import axios from 'axios';
import { UserLoginData, LoginResponse } from '../interfaces/types';

const api = axios.create({
  baseURL: 'https://localhost:3003',
});

export const login = async (data: UserLoginData): Promise<string> => {
  try {
    const response = await api.post<LoginResponse>('/login', data);
    const { token } = response.data;
    return token;
  } catch (error) {
    console.log(error);
    return '';
  }
};
