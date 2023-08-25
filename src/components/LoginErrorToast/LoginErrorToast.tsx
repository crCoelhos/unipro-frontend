import React, { FC } from "react";
import styles from "./LoginErrorToast.module.css";
import { Toast, ToastContainer } from "react-bootstrap";
import CurrentTime from "../CurrentTime/CurrentTime";

interface LoginErrorToastProps {}

const LoginErrorToast: FC<LoginErrorToastProps> = () => (
  <div className={styles.LoginErrorToast}>
    <Toast bg="danger">
      <Toast.Body className={styles.ToastBody}>
        <p>Usuário ou senha incorreto.</p>
        <p>Tente novamente.</p>
      </Toast.Body>
    </Toast>
  </div>
);

export default LoginErrorToast;
