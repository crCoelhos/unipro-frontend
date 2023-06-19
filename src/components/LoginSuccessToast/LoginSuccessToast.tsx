import React, { FC } from "react";
import styles from "./LoginSuccessToast.module.css";
import { Toast } from "react-bootstrap";

interface LoginSuccessToastProps {}

const LoginSuccessToast: FC<LoginSuccessToastProps> = () => (
  <div className={styles.LoginSuccessToast}>
    <Toast bg="success">
      <Toast.Body className={styles.ToastBody}>
        Login realizado com sucesso.
      </Toast.Body>
    </Toast>
  </div>
);

export default LoginSuccessToast;
