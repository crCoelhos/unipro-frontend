import { Link, useNavigate  } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './Menu.module.css';
import HomeIcon from '../../assets//icons/home-icon.svg'
import ProfileIcon from '../../assets//icons/profile-icon.svg'
import FeedIcon from '../../assets//icons/social-icon.svg'
import ExitIcon from '../../assets//icons/mdi-exit-to-app.svg'
import useLoginController from '../../controllers/LoginController.tsx';
import useProfileController from '../../controllers/profileController';

const Menu = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/index');
  }


  const { logout } = useProfileController();

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { getSessionUser } = useLoginController();
  const user = getSessionUser();

  if (!user) {
    return console.error("user not found");
  };


  return (
    <div className={`${styles.menuContainer} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.menuToggle} onClick={toggleCollapsed}>
        <div className={styles.menuIcon} />
      </div>

      <div className={styles.menuContent}>
        <ul className={styles.menuList}>
          <li className={styles.option}>
            <div className={styles.userName} >{user.user.name.split(' ')[0]}</div>

          </li>

          <li>
            <Link to="/home" className={styles.option}>
              <span className={styles.optionText}> Home</span>
              <img src={HomeIcon} alt="" className={styles.optionIcon} />
            </Link>
          </li>
          <li>
            <Link to="/profile" className={styles.option}>
              <span className={styles.optionText}> Perfil</span>
              <img src={ProfileIcon} alt="" className={styles.optionIcon} />
            </Link>
          </li>
          <li>
            <Link className={styles.option} to="/contact-us">
              <span className={styles.optionText}> Contato</span>
              <img src={FeedIcon} alt="" className={styles.optionIcon} />
            </Link>
          </li>
          <li>
            <Link className={styles.option} onClick={handleLogout} to="/index">
              <span className={styles.optionText}> Sair</span>
              <img src={ExitIcon} alt="" className={styles.optionIcon} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
