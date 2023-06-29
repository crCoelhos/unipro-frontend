import React, { FC } from 'react';
import styles from './UserActiveTickets.module.css';

interface UserActiveTicketsProps {}

const UserActiveTickets: FC<UserActiveTicketsProps> = () => (
  <div className={styles.UserActiveTickets}>
    UserActiveTickets Component
  </div>
);

export default UserActiveTickets;
