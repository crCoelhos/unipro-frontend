import React from "react";
import PropTypes from "prop-types";
import styles from "./PaymentFailedToast.module.css";
import { Toast, ToastContainer } from "react-bootstrap";
import CurrentTime from "../CurrentTime/CurrentTime";



const PaymentFailedToast = () => (
  <div className={styles.PaymentFailedToast}>
    <ToastContainer className="position-static">
      <Toast bg="danger">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Pagamento recusado</strong>
          <small className="text-muted"><CurrentTime/></small>
        </Toast.Header>
        <Toast.Body className="danger" style={{color:"#fff"}}>
          A compra do ingresso não foi realizada, tente novamente.
        </Toast.Body>
      </Toast>
    </ToastContainer>{" "}
  </div>
);

PaymentFailedToast.propTypes = {};

PaymentFailedToast.defaultProps = {};

export default PaymentFailedToast;
