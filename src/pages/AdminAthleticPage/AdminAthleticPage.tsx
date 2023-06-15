import React, { FC } from 'react';
import styles from './AdminAthleticPage.module.css';
import HandSidebar from '../../components/HandSidebar/HandSidebar';
import AthleticList from '../../components/AthleticList/AthleticList';

interface AdminAthleticPageProps {}

const AdminAthleticPage: FC<AdminAthleticPageProps> = () => (
  <div className={styles.AdminAthleticPage}>
    <HandSidebar/>
    <AthleticList/>
  </div>
);

export default AdminAthleticPage;
