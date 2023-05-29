import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import HomeFooter from '../../components/homeFooter/homeFooter';
import EventCatalogueFix from '../../components/eventCatalogueFix/eventCatalogueFix';


const Home: React.FC = () => {


  return (
    <div className={styles.homeContent}>
      <Menu />

      <h1>teste</h1>
      <h3>jorge</h3>
      <EventCatalogueFix />
      <HomeFooter />
    </div>
  );
}

export default Home;
