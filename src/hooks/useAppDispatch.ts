/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

export const useAppDispatch = (): any => useDispatch<AppDispatch>();
