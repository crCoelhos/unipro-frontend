import React, { FC } from 'react';
import styles from './homeFooterCreatedBy.module.scss';
import { Link } from 'react-router-dom';

interface HomeFooterCreatedByProps { }

const HomeFooterCreatedBy: FC<HomeFooterCreatedByProps> = () => (
  <div className={styles.HomeFooterCreatedBy}>
    <h4>Criado por <Link to="https://github.com/n-x-t-gen" className={styles.CreatedByLink} target="_blank" rel="noopener noreferrer" >NXTgen™</Link></h4>
  </div>
);

export default HomeFooterCreatedBy;
