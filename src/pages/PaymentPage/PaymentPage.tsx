import React, { useEffect, useState } from "react";
import styles from "./PaymentPage.module.css";
import { User } from "../../types";
import PaymentForm from '../../components/PaymentForm/PaymentForm'

const PaymentPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const dataFromStorage = sessionStorage.getItem("user");
    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      setUser(parsedData);
    }
  }, []);

  return (
    <div className={styles.PaymentPage}>
      {user && (
        <>
          <h1>User: {user.name}</h1>
          <h1>{user.cpf}</h1>
        </>
      )}

          <PaymentForm/>
    </div>
  );
};

PaymentPage.propTypes = {};

PaymentPage.defaultProps = {};

export default PaymentPage;
