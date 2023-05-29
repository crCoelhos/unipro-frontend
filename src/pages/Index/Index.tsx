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
      <div className={styles.mainContent}>

        <Link to="/login">
          <button className={styles.sendButton} type="submit">Entrar</button>
        </Link>

      </div>
    </div>
  );
}

export default Index;
