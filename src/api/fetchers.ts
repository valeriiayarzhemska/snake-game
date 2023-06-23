import axios from 'axios';
import { User } from '../types/User';

export const get = async <T>(url: string): Promise<T> => {
  const { data } = await axios.get<T>(url);

  return data;
};

export const post = async <T>(url: string, body: Omit<User, 'id'>): Promise<T> => {
  const { data } = await axios.post<T>(url, body);

  return data;
};

export const patch = async <T>(url: string, body: Partial<User>): Promise<T> => {
  const { data } = await axios.patch<T>(url, body);

  return data;
};
