import React, { FC } from 'react';
import styles from './UserPurchasesList.module.css';

interface UserPurchasesListProps {}

const UserPurchasesList: FC<UserPurchasesListProps> = () => (
  <div className={styles.UserPurchasesList}>
    UserPurchasesList Component
  </div>
);

export default UserPurchasesList;
