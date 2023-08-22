import React from "react";
import PropTypes from "prop-types";
import styles from "./PaymentSuccessToast.module.css";
import { Toast, ToastContainer } from "react-bootstrap";
import CurrentTime from "../CurrentTime/CurrentTime";

// function getFormattedTime() {
//   const currentDate = new Date();
//   const hours = String(currentDate.getHours()).padStart(2, '0');
//   const minutes = String(currentDate.getMinutes()).padStart(2, '0');
//   const seconds = String(currentDate.getSeconds()).padStart(2, '0');

//   return `${hours}:${minutes}:${seconds}`;
// }

// const currentTime = getFormattedTime();

const PaymentSuccessToast = () => (
  <div className={styles.PaymentSuccessToast}>
    <ToastContainer className="position-static">
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Pagamento realizado com sucesso.</strong>
          <small className="text-muted">
            <CurrentTime />
          </small>
        </Toast.Header>
        <Toast.Body>Você será redirecionado em breve</Toast.Body>
      </Toast>
    </ToastContainer>
  </div>
);

PaymentSuccessToast.propTypes = {};

PaymentSuccessToast.defaultProps = {};

export default PaymentSuccessToast;
