import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './AdminSection.module.css';
import HandSidebar from '../../components/HandSidebar/HandSidebar';
import useLoginController from '../../controllers/LoginController';

const AdminSection = () => {
  const { getSessionUser } = useLoginController();
  const user = getSessionUser();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    if (!isAdmin) {
      navigate('/home');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className={styles.AdminSection}>
      <HandSidebar />
    </div>
  );
};

AdminSection.propTypes = {};

AdminSection.defaultProps = {};

export default AdminSection;
