import React, { useState } from 'react';
import LogoImperial from "../../assets/images/logoimperial-svg 1.svg";
import GreetingImperial from "../../assets/images/vida-longa-greeting-svg-1.svg";
import DevelopedByImperial from "../../assets/images/developed-by-svg-1.svg";
import styles from './PasswordRecovery.module.css';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';



const CreatePasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  }

  const handlePasswordConfirmation = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setConfirmPassword(event.target.value);
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // tbadd
  }

  return (
    <div className={styles.loginContent}>
      <Header />

      <Link to="/login">
        <img src={LogoImperial} className={styles.logoImperial} alt="logo da imperial" />
      </Link>
      <form onSubmit={handleSubmit}>
        <label>  <p className={styles.inputText}>Crie sua senha:</p>
          <input className={styles.inputFieldPassword} type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          <p className={styles.inputText}>Confirme sua senha:</p>
          <input className={styles.inputFieldPassword} id='userInput' type="password" value={confirmPassword} onChange={handlePasswordConfirmation} />
        </label>
        <br />
        <button className={styles.sendButton} type="submit">Criar</button>
      </form>

      <footer className={styles.logoFooter}>
        <Link to="/home">
          <img src={GreetingImperial} className={`${styles.GreetingImperial} ${styles.greeting}`} id='greeting' alt="" />
        </Link>


        <a href="https://github.com/a-a-a-imperial">
          <img src={DevelopedByImperial} className={styles.DevelopedByImperial} alt="" />
        </a>
      </footer>
    </div>
  );
};

export default CreatePasswordPage;
