import React, { FC } from 'react';
import styles from './homeFooterSponsors.module.scss';

import imgPlaceholder from '../../assets/images/dogola-removebg-preview.png'

interface HomeFooterSponsorsProps { }

const HomeFooterSponsors: FC<HomeFooterSponsorsProps> = () => (
  <div className={styles.HomeFooterSponsors}>
    <div className={styles.sponsorArea}>
      <a href="#"><img src={imgPlaceholder} alt="dogola" className={styles.sponsorImg} />
      </a>
    </div>
  </div>
);

export default HomeFooterSponsors;
