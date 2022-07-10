import {
  LoginUserRequest,
  NewUserRequest,
  UpdateUserRequest,
} from '../store/userSlice/types';
import axios from './axios';

const endpoints = {
  registration: (data: NewUserRequest) => axios.post('/users', data),
  login: (data: LoginUserRequest) => axios.post('/users/login', data),
  getCurrentUser: () => axios.get('/user'),
  updateProfile: (data: UpdateUserRequest) => axios.put('/user', data),
};

export default endpoints;
