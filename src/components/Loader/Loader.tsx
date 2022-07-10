import { Spin } from 'antd';
import React, { FC } from 'react';
import classes from './Loader.module.scss';

interface LoaderProps {
  size: 'small' | 'large';
  className?: string;
}

const Loader: FC<LoaderProps> = ({ size, className }) => {
  const loader =
    size === 'large' ? (
      <div className={classes['spin-wrapper']}>
        <Spin size={size} />
      </div>
    ) : (
      <Spin size={size} className={className} />
    );
  return loader;
};

export default Loader;
