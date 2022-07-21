/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Notification from '../../components/Notification/Notification';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { updateProfile } from '../../store/userSlice';
import { UpdateUser } from '../../store/userSlice/types';
import classes from '../SignUpPage/SignUpPage.module.scss';

const EditProfilePage: FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateUser>({
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, user, error } = useAppSelector((state) => state.user);
  const token = user ? user.token : '';

  let isServerError = false;
  if (error) {
    // @ts-ignore: Unreachable code error
    isServerError = !!error.errors.username;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<UpdateUser> = async (data: any) => {
    for (const key in data) {
      if (!data[key]) delete data[key];
    }
    const response = await dispatch(
      updateProfile({ user: { ...data, token } })
    );

    if (response.type.endsWith('rejected')) {
      if (response.payload.errors.username) {
        setError('username', {
          type: 'server',
          message: `Username ${response.payload.errors.username}`,
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
        <h2 className={classes.title}>Edit Profile</h2>
        <label>
          Username
          <input
            type="text"
            defaultValue={user?.username}
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
            defaultValue={user?.email}
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
          New Password
          <input
            type="password"
            className={errors.password && classes['input-error']}
            {...register('password', {
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
          Avatar image (url)
          <input
            type="text"
            className={errors.image && classes['input-error']}
            {...register('image', {
              pattern: {
                value:
                  // eslint-disable-next-line max-len
                  /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi,
                message: 'Invalid url',
              },
            })}
            placeholder="Avatar image"
          />
          {errors.image && (
            <div className={classes.error}>{errors.image.message}</div>
          )}
        </label>
        <button type="submit">
          {isLoading ? <Loader size="small" className="button-spin" /> : 'Save'}
        </button>
      </form>
    </section>
  );
};

export default EditProfilePage;
