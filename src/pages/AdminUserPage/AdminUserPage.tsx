import React, { FC, useEffect, useState } from "react";
import styles from "./AdminUserPage.module.css";
import HandSidebar from "../../components/HandSidebar/HandSidebar";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLoginController from "../../controllers/LoginController";
import UserList from "../../components/UserList/UserList";

interface AdminUserPageProps {}

const AdminUserPage: FC<AdminUserPageProps> = () => {
  const { getSessionUser } = useLoginController();
  const user = getSessionUser();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = sessionStorage.getItem("user");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/home");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className={styles.AdminUserPage}>
      <HandSidebar />
      <Row>
        <Col lg={12}>
          <UserList />
        </Col>
      </Row>
    </div>
  );
};
export default AdminUserPage;
