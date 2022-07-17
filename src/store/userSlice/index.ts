/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import api from '../../api';
import {
  GeneralRequest,
  RequestType,
  UserResponse,
  UserStateType,
} from './types';

function asyncThunkCreator(name: string, request: RequestType, error: string) {
  return createAsyncThunk<UserResponse, GeneralRequest, { rejectValue: any }>(
    name,
    async (info, { rejectWithValue }): Promise<any> => {
      try {
        const { data } = await request(info);
        return data;
      } catch (e: any) {
        return rejectWithValue({
          errorMessage: error,
          errors: e.response.data.errors,
        });
      }
    }
  );
}

export const registerUser = asyncThunkCreator(
  'user/register',
  api.user.registration,
  'Произошла ошибка при регистрации пользователя'
);

export const loginUser = asyncThunkCreator(
  'user/login',
  api.user.login,
  'Произошла ошибка при входе на страницу пользователя'
);

export const getCurrentUser = asyncThunkCreator(
  'user/getCurrent',
  api.user.getCurrentUser,
  'Произошла ошибка при получении данных текущего пользователя'
);

export const updateProfile = asyncThunkCreator(
  'user/updateProfile',
  api.user.updateProfile,
  'Произошла ошибка при обновлении профиля'
);

const initialState: UserStateType = {
  user: null,
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state: UserStateType) => {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuth');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled, (state, action) => {
        state.user = action.payload.user;
        if (state.user) {
          localStorage.setItem('token', state.user.token);
          localStorage.setItem('isAuth', 'true');
        }
        state.isLoading = false;
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addMatcher(isError, (state, action: PayloadAction<any>) => {
        if (action.payload) state.error = action.payload;
        state.isLoading = false;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected') && action.type.includes('user');
}

function isPending(action: AnyAction) {
  return action.type.endsWith('pending') && action.type.includes('user');
}

function isFulfilled(action: AnyAction) {
  return action.type.endsWith('fulfilled') && action.type.includes('user');
}

export default userSlice.reducer;
export const { logOut } = userSlice.actions;
