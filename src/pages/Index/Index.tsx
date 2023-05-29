import React from 'react';
import styles from './Index.module.css';
import { Link } from 'react-router-dom';
import LogoImperial from "../../assets/images/logoimperial-svg 1.svg";
import GreetingImperial from "../../assets/images/vida-longa-greeting-svg-2-white.svg";
import DevelopedByImperial from "../../assets/images/developed-by-svg-2-white.svg";
import RandomBackground from '../../components/RandomBackground/RandomBackground';



const Index: React.FC = () => {


  return (
    <div className={styles.indexContent}>
      <RandomBackground />
      <div className={styles.mainContent}>
        <Link to="/index">
          <img src={LogoImperial} className={styles.logoImperial} alt="logo da imperial" />
        </Link>
        <div className={styles.pageText}>
          <p>PORTAL</p>
          <p>IMPERIAL</p>
          <Link to="/login">
            <button className={styles.sendButton} type="submit">Entrar</button>
          </Link>
          <footer className={styles.logoFooter}>
            <a href="https://github.com/a-a-a-imperial">
              <img src={GreetingImperial} className={`${styles.GreetingImperial} ${styles.greeting}`} id='greeting' alt="" />
            </a>
            <a href="https://github.com/a-a-a-imperial">
              <img src={DevelopedByImperial} className={styles.DevelopedByImperial} alt="" id='contact' />
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Index;
