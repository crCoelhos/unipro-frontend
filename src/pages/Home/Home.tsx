import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';


const Home: React.FC = () => {


  return (
    <div className={styles.homeContent}>
      <Menu />
      
    </div>
  );
}

export default Home;
