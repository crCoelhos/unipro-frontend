import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdminSection.module.css';
import HandSidebar from '../../components/HandSidebar/HandSidebar'
const AdminSection = () => (
  <div className={styles.AdminSection}>
    <HandSidebar />

  </div>
);

AdminSection.propTypes = {};

AdminSection.defaultProps = {};

export default AdminSection;
