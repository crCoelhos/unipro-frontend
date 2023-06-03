import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdminEventPage.module.css';
import EventCatalogueFix from '../../components/eventCatalogueFix/eventCatalogueFix';
import HandSidebar from '../../components/HandSidebar/HandSidebar';
import {Row, Col} from 'react-bootstrap'

const AdminEventPage = () => (
  <div className={styles.AdminEventPage}>
    <Row>
      <Col lg={3}>
        <HandSidebar />
      </Col>
      <Col lg={9}>
        <EventCatalogueFix />
      </Col>
    </Row>
  </div>
);

AdminEventPage.propTypes = {};

AdminEventPage.defaultProps = {};

export default AdminEventPage;
