import React, { FC } from "react";
import styles from "./UserProfileSubmitionFailToast.module.css";
import { Toast, ToastContainer } from "react-bootstrap";
import CurrentTime from "../CurrentTime/CurrentTime";

interface UserProfileSubmitionFailToastProps {}

const UserProfileSubmitionFailToast: FC<UserProfileSubmitionFailToastProps> = () => (
  <div className={styles.LoginErrorToast}>
      <Toast bg="danger">
       
        <Toast.Body className={styles.ToastBody}>
          Dados não atualizados. Você será redirecionado em breve.
        </Toast.Body>
      </Toast>
  </div>
);

export default UserProfileSubmitionFailToast;
