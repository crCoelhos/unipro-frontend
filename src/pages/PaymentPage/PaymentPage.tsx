import React, { useEffect, useState } from "react";
import styles from "./PaymentPage.module.css";
import { User } from "../../types";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import MercadoPagoForm from "../../components/MercadoPago/MercadoPagoForm";
import Menu from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import { useNavigate } from "react-router-dom";
import Countdown from "../../components/Countdown/Countdown";

const PaymentPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate()
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
  useEffect(() => {
    const dataFromStorage = sessionStorage.getItem("user");
    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      setUser(parsedData);
    }
  }, []);

  return (
    <div className={styles.PaymentPage}>
      <Menu/>
      <div className={styles.PaymetPageContainer}>

      </div>
      {user && (
        <>
          <h1 className={styles.UserDirective}>{user.name}, selecione uma forma de pagamento:</h1>
        </>
      )}
      <PaymentForm />

      <HomeComposedFooter/>

      <Countdown duration={20}/>

    </div>
  );
};

PaymentPage.propTypes = {};

PaymentPage.defaultProps = {};

export default PaymentPage;
