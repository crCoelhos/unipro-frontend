import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomePublicationsContainer.module.css';
import HomePublications from '../HomePublications/HomePublications';

const HomePublicationsContainer: React.FC = () => (
  <div className={styles.HomePublicationsContainer}>

      <HomePublications/>

  </div>
);

HomePublicationsContainer.propTypes = {};

HomePublicationsContainer.defaultProps = {};

export default HomePublicationsContainer;
