import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import LogoImperial from "../../assets/images/logoimperial-svg 1.svg";
import GreetingImperial from "../../assets/images/vida-longa-greeting-svg-1.svg";
import DevelopedByImperial from "../../assets/images/developed-by-png-1.png";
import styles from './Login.module.css';
import useLoginController from '../../controllers/LoginController';

const LoginPage: React.FC = () => {
  const {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
    loginError,
    loggedIn
  } = useLoginController();

  if (loggedIn) {
    return <Navigate to='/home' />;
  }

  return (
    <div className={styles.loginContent}>
      <Header />
      <Link to="/login">
        <img src={LogoImperial} className={styles.logoImperial} alt="logo da imperial" />
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          <p className={styles.inputText}>Usuário:</p>
          <input
            className={styles.inputFieldUser}
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder='Ex: 12345678910'
          />
        </label>
        <br />
        <label>
          <p className={styles.inputText}>Senha:</p>
          <input
            className={styles.inputFieldPassword}
            id='userInput'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        {loginError && <p className={styles.error}>errou a senha, primo</p>}
        <button className={styles.sendButton} type="submit">Entrar</button>
      </form>
      <div id='passRecovery'>
        <p>Não consegue entrar mlk? <Link to="/password-recovery" className={styles.passRecovery}>Clica aq mano</Link></p>
      </div>

      <footer className={styles.logoFooter}>
        <Link to="/contact-us">
          <img src={GreetingImperial} className={`${styles.GreetingImperial} ${styles.greeting}`} id='greeting' alt="imagem contendo a saudação '#vidalonga" />
        </Link>

        <a href="https://github.com/a-a-a-imperial">
          <img src={DevelopedByImperial} className={styles.DevelopedByImperial} alt="imagem contendo 'developed by imperial'" id='contact' />
        </a>
      </footer>
    </div >
  );
};

export default LoginPage;




