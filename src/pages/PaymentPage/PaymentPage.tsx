import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PaymentPage.module.css';

interface User {
  id: number;
  name: string;
  birthdate: string;
  sex: string;
  email: string;
  contact: string;
  cpf: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  role: {
    name: string;
  };
}

const PaymentPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const dataFromStorage = sessionStorage.getItem('user');
    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      setUser(parsedData);
    }
  }, []);

  return (
    <div className={styles.PaymentPage}>
      {user && (
        <><h1>User: {user.name}</h1><h1>{user.cpf}</h1></>
)}
    </div>
  );
};

PaymentPage.propTypes = {};

PaymentPage.defaultProps = {};

export default PaymentPage;
