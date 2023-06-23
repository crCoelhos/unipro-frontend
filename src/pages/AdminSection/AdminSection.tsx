import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './AdminSection.module.css';
import HandSidebar from '../../components/HandSidebar/HandSidebar';
import useLoginController from '../../controllers/LoginController';

const AdminSection = () => {
  const { getSessionUser } = useLoginController();
  const user = getSessionUser();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = sessionStorage.getItem('user');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
      return navigate('/login');
    }
    setIsLoggedIn(true);
  }
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

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
