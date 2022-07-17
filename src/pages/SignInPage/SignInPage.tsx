/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Notification from '../../components/Notification/Notification';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { loginUser } from '../../store/userSlice';
import { LoginUser } from '../../store/userSlice/types';
import classes from '../SignUpPage/SignUpPage.module.scss';

const SignInPage: FC = () => {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.user);

  let isServerError = false;
  if (error) {
    // @ts-ignore: Unreachable code error
    isServerError = !!error.errors['email or password'];
  }

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    const { email, password } = data;
    // @ts-ignore: Unreachable code error
    const response = await dispatch(loginUser({ user: { email, password } }));

    if (response.type.endsWith('rejected')) {
      if (response.payload.errors['email or password']) {
        setError('password', {
          type: 'server',
          message: `Email or password ${response.payload.errors['email or password']}`,
        });
      }
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <section className={classes['form-container']}>
      {/* @ts-ignore: Unreachable code error */}
      {error && !isServerError && <Notification message={error.errorMessage} />}
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.title}>Sign In</h2>
        <label>
          Email address
          <input
            type="text"
            className={errors.email && classes['input-error']}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email',
              },
            })}
            placeholder="Email address"
          />
          {errors.email && (
            <div className={classes.error}>{errors.email.message}</div>
          )}
        </label>
        <label>
          Password
          <input
            type="password"
            className={errors.password && classes['input-error']}
            {...register('password', {
              required: 'Password is required',
            })}
            placeholder="Password"
          />
          {errors.password && (
            <div className={classes.error}>{errors.password.message}</div>
          )}
        </label>
        <button type="submit">
          {isLoading ? (
            <Loader size="small" className="button-spin" />
          ) : (
            'Login'
          )}
        </button>
        <p>
          Dont have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </section>
  );
};

export default SignInPage;
