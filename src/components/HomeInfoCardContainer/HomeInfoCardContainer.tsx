import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomeInfoCardContainer.module.css';
import HomeInfoCards from '../HomeInfoCards/HomeInfoCards';

const HomeInfoCardContainer = () => (
  <div className={styles.HomeInfoCardContainer}>
    <HomeInfoCards/>
  </div>
);

HomeInfoCardContainer.propTypes = {};

HomeInfoCardContainer.defaultProps = {};

export default HomeInfoCardContainer;
