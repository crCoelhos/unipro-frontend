import React, { FC } from "react";
import styles from "./UserProfileSubmitionSuccessToast.module.css";
import { Toast, ToastContainer } from "react-bootstrap";
import CurrentTime from "../CurrentTime/CurrentTime";

interface UserProfileSubmtionSuccessToastProps {}

const UserProfileSubmtionSuccessToast: FC<UserProfileSubmtionSuccessToastProps> = () => (
  <div className={styles.LoginErrorToast}>
      <Toast bg="success">
       
        <Toast.Body className={styles.ToastBody}>
          Dados atualizados. Você será redirecionado em breve.
        </Toast.Body>
      </Toast>
  </div>
);

export default UserProfileSubmtionSuccessToast;
