import React from 'react';
import PropTypes from 'prop-types';
import styles from './DocAndBookingPage.module.css';
import Menu from '../../components/Menu/Menu';
import HomeComposedFooter from '../../components/homeComposedFooter/homeComposedFooter';
import DocumentArea from '../../components/DocumentArea/DocumentArea';
import UseTermArea from '../../components/UseTermArea/UseTermArea';

const DocAndBookingPage = () => (
  <div className={styles.DocAndBookingPage}>
    <Menu/>
  <DocumentArea/>
  <UseTermArea pdfFile={'https://www.africau.edu/images/default/sample.pdf'}/>

    <HomeComposedFooter/>
  </div>
);

DocAndBookingPage.propTypes = {};

DocAndBookingPage.defaultProps = {};

export default DocAndBookingPage;
