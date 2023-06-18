import React, { FC } from 'react';
import styles from './CommomUserProfileBox.module.css';

interface CommomUserProfileBoxProps {}

const CommomUserProfileBox: FC<CommomUserProfileBoxProps> = () => (
  <div className={styles.CommomUserProfileBox}>
    CommomUserProfileBox Component
  </div>
);

export default CommomUserProfileBox;
