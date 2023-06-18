import React, { FC } from 'react';
import styles from './AdminUserProfileBox.module.css';

interface AdminUserProfileBoxProps {}

const AdminUserProfileBox: FC<AdminUserProfileBoxProps> = () => (
  <div className={styles.AdminUserProfileBox}>
    AdminUserProfileBox Component
  </div>
);

export default AdminUserProfileBox;
