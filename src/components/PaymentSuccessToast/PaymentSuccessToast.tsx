import React from 'react';
import PropTypes from 'prop-types';
import styles from './PaymentSuccessToast.module.css';
import { Toast, ToastContainer } from 'react-bootstrap';

const PaymentSuccessToast = () => (
  <div className={styles.PaymentSuccessToast}>
    <ToastContainer className="position-static">
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>See? Just like this.</Toast.Body>
      </Toast>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">TIME</small>
        </Toast.Header>
        <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
      </Toast>
    </ToastContainer>
  </div>
);

PaymentSuccessToast.propTypes = {};

PaymentSuccessToast.defaultProps = {};

export default PaymentSuccessToast;
