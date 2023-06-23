import React, { FC } from 'react';
import styles from './AthleticProfile.module.css';

interface AthleticProfileProps {}

const AthleticProfile: FC<AthleticProfileProps> = () => (
  <div className={styles.AthleticProfile}>
    AthleticProfile Component
  </div>
);

export default AthleticProfile;
