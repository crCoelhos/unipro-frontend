import React from 'react';
import PropTypes from 'prop-types';
import styles from './PaymentProcessingToast.module.css';
import { Toast, ToastContainer } from "react-bootstrap";

const PaymentProcessingToast = () => (
  <div className={styles.PaymentProcessingToast}>
<ToastContainer className="position-static">
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">$$tipo de erro$$</strong>
          <small className="text-muted">por timestamp aqui</small>
        </Toast.Header>
        <Toast.Body>
          A compra do ingresso $$ticket.name$$ não foi realizada
        </Toast.Body>
      </Toast>
    </ToastContainer>  </div>
);

PaymentProcessingToast.propTypes = {};

PaymentProcessingToast.defaultProps = {};

export default PaymentProcessingToast;
