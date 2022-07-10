import api from '../../api';

export type User = {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
};

export interface UserStateType {
  user: User | null;
  error: string;
  isLoading: boolean;
}

export type NewUser = {
  username: string;
  email: string;
  password: string;
};

export type UserResponse = {
  user: User;
};

export type NewUserRequest = {
  user: NewUser;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type LoginUserRequest = {
  user: LoginUser;
};

export type SignUpFields = {
  username: string;
  email: string;
  password: string;
  repeat?: string;
  agreement?: string;
};

export type UpdateUser = {
  email?: string;
  token?: string;
  username?: string;
  password?: string;
  bio?: string;
  image?: string;
};

export type UpdateUserRequest = {
  user: UpdateUser;
};

export type Registration = typeof api.user.registration;
export type Login = typeof api.user.login;
export type UpdateProfile = typeof api.user.updateProfile;
export type RequestType = Registration | Login | UpdateProfile;

export type GeneralRequest = UpdateUserRequest &
  LoginUserRequest &
  NewUserRequest;
