/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */
import classNames from 'classnames';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Notification from '../../components/Notification/Notification';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { registerUser } from '../../store/userSlice';
import { NewUser, SignUpFields } from '../../store/userSlice/types';
import classes from './SignUpPage.module.scss';

const SignUpPage: FC = () => {
  const {
    setError,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpFields>({
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.user);
  let isServerError = false;
  if (error) {
    // @ts-ignore: Unreachable code error
    isServerError = !!error.errors.username || !!error.errors.username;
  }

  const onSubmit: SubmitHandler<NewUser> = async (data) => {
    const { username, email, password } = data;
    const response = await dispatch(
      registerUser({ user: { username, email, password } })
    );

    if (response.type.endsWith('rejected')) {
      const { username, email } = response.payload.errors;
      if (username) {
        setError('username', {
          type: 'server',
          message: `Username ${username}`,
        });
      }
      if (email) {
        setError('email', {
          type: 'server',
          message: `Email ${email}`,
        });
      }
    } else {
      navigate('/', { replace: true });
    }
  };

  const agreementClass = classNames({
    [classes.agreement]: true,
    [classes['agreement-error']]: errors.agreement,
  });

  return (
    <section className={classes['form-container']}>
      {/* @ts-ignore: Unreachable code error */}
      {error && !isServerError && <Notification message={error.errorMessage} />}
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.title}>Create new account</h2>
        <label>
          Username
          <input
            type="text"
            className={errors.username && classes['input-error']}
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username needs to be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must not exceed 20 characters',
              },
            })}
            placeholder="Username"
          />
          {errors.username && (
            <div className={classes.error}>{errors.username.message}</div>
          )}
        </label>
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
              minLength: {
                value: 6,
                message: 'Password needs to be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must not exceed 40 characters',
              },
            })}
            placeholder="Password"
          />
          {errors.password && (
            <div className={classes.error}>{errors.password.message}</div>
          )}
        </label>
        <label>
          Repeat password
          <input
            type="password"
            className={errors.repeat && classes['input-error']}
            {...register('repeat', {
              required: 'Please confirm password!',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || 'Passwords should match!';
                },
              },
            })}
            placeholder="Password"
          />
          {errors.repeat && (
            <div className={classes.error}>{errors.repeat.message}</div>
          )}
        </label>
        <input
          {...register('agreement', {
            required: 'You must agree to the terms',
          })}
          type="checkbox"
          id="agreement"
        />
        <label htmlFor="agreement" className={agreementClass}>
          I agree to the processing of my personal information
        </label>
        {errors.agreement && (
          <div className={classes.error}>{errors.agreement.message}</div>
        )}
        <button type="submit">
          {isLoading ? (
            <Loader size="small" className="button-spin" />
          ) : (
            'Create'
          )}
        </button>
        <p>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </section>
  );
};

export default SignUpPage;
