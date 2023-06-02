import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdminUserPage.module.css';
import UserList from '../../components/UserList/UserList'
const AdminUserPage = () => (
  <div className={styles.AdminUserPage}>
    <UserList/>
  </div>
);

AdminUserPage.propTypes = {};

AdminUserPage.defaultProps = {};

export default AdminUserPage;
