import React from 'react';
import PropTypes from 'prop-types';
import styles from './CreateEventPage.module.css';
import Menu from '../../components/Menu/Menu';
import CreateEventBox from '../../components/CreateEventBox/CreateEventBox';
import HomeComposedFooter from '../../components/homeComposedFooter/homeComposedFooter';

const CreateEventPage: React.FC = () => (
  <div className={styles.CreateEventPage}>
      <Menu/>
      <CreateEventBox/>
      <HomeComposedFooter/>
  </div>
);

CreateEventPage.propTypes = {};

CreateEventPage.defaultProps = {};

export default CreateEventPage;
