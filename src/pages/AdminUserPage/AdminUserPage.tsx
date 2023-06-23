import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdminUserPage.module.css';
import UserList from '../../components/UserList/UserList'
import HandSidebar from '../../components/HandSidebar/HandSidebar';
import { Row, Col } from 'react-bootstrap'
const AdminUserPage = () => (
  
  <div className={styles.AdminUserPage}>
    <Row>
      <Col lg={3}>
        <HandSidebar />
      </Col>
      <Col lg={9}>
        <UserList />
      </Col>
    </Row>
  </div>
);

export default AdminUserPage;



// todo:
// responsividade
// colapse on shrink
// 
