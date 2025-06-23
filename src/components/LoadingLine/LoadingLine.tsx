import React from 'react';
import styles from './LoadingLine.module.scss';

const LoadingLine: React.FC = () => {
  return (
    <div className={styles['loading-line']}>
      <div className={styles['loading-line__line']} />
    </div>
  );
};

export default LoadingLine;
