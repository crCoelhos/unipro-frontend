import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => (

  <div className={styles.portalImperial}>
    <p>PORTAL</p>
    <p>IMPERIAL</p>
  </div>
);
export default Header;