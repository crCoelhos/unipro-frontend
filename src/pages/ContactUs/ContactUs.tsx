import React from 'react';
import styles from './ContactUs.module.css';

import GreetingImperial from "../../assets/images/vida-longa-greeting-svg-1.svg";
import DevelopedByImperial from "../../assets/images/developed-by-svg-1.svg";
import whatsappIcon from '../../assets/icons/baseline-whatsapp.svg'
import instagramIcon from '../../assets/icons/baseline_instagram.svg'
import twitterIcon from '../../assets/icons/baseline_twitter.svg'
// import Menu from '../../components/Menu/Menu';
import { Link } from 'react-router-dom';

const ContactUsPage: React.FC = () => (
  <div className={styles.contactUsContent}>
    {/* <Menu /> */}

    <div className={styles.contactUsMain}>
      <ul className={styles.contactList}>
        <li className={styles.contactOption}>
          <a href="https://chat.whatsapp.com/LNGyEX3X12u59kl7CauNIn" target='_blank' rel="noreferrer">
            <p>grupo de informes</p>
            <img src={whatsappIcon} alt="" />
          </a>
        </li>
        <li className={styles.contactOption}>
          <a href="https://www.instagram.com/a.a.a.imperial/" target='_blank' rel="noreferrer">
            <p>@a.a.a.imperial</p>
            <img src={instagramIcon} alt="icone do instagram" />
          </a>
        </li>
        <li className={styles.contactOption}>
          <a href="https://twitter.com/imperialufac" target='_blank' rel="noreferrer">
            <p>@imperialufac</p>
            <img src={twitterIcon} alt="icone do twitter" />
          </a>
        </li>
      </ul>

      <footer className={styles.logoFooter}>
        <Link to="/contact-us">
          <img src={GreetingImperial} className={`${styles.GreetingImperial} ${styles.greeting}`} id='greeting' alt="imagem contendo '#vida longa'" />
        </Link>


        <a href="https://github.com/a-a-a-imperial">
          <img src={DevelopedByImperial} className={styles.DevelopedByImperial} alt="imagem contendo 'developed by imperial'" id='contact' />
        </a>
      </footer>
    </div>
  </div>
);


ContactUsPage.defaultProps = {};

export default ContactUsPage;
