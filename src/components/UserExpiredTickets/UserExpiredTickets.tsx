import React, { FC } from 'react';
import styles from './UserExpiredTickets.module.css';

interface UserExpiredTicketsProps {}

const UserExpiredTickets: FC<UserExpiredTicketsProps> = () => (
  <div className={styles.UserExpiredTickets}>
    UserExpiredTickets Component
  </div>
);

export default UserExpiredTickets;
