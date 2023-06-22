import { User } from '../types/User';
import { get, post, patch } from './fetchers';

const BASE_URL = process.env.REACT_APP_BE_BASE_URL;
// const BASE_URL = 'http://localhost:4000';
const USERS_ENDPOINT = `${BASE_URL}/users`;
const TOP_USERS_ENDPOINT = `${USERS_ENDPOINT}/top`;

export const getAllUsers = (): Promise<User[]> => {
  return get<User[]>(USERS_ENDPOINT);
};

export const getTopUsers = (): Promise<User[]> => {
  return get<User[]>(TOP_USERS_ENDPOINT);
};

export const createUser = (data: User): Promise<User> => {
  return post<User>(USERS_ENDPOINT, {
    ...data,
  });
};

export const updateUser = (id: string, data: Partial<User>): Promise<User> => {
  const url = `${USERS_ENDPOINT}/${id}`;
  return patch<User>(url, {
    ...data,
  });
};
