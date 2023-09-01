import React, { FC, useEffect, useState } from "react";
import styles from "./AdminAthleticPage.module.css";
import HandSidebar from "../../components/HandSidebar/HandSidebar";
import AthleticList from "../../components/AthleticList/AthleticList";
import { Row, Col } from "react-bootstrap";
import CreateAthleticModal from "../../components/CreateAthleticModal/CreateAthleticModal";
import { useNavigate } from "react-router-dom";
import useLoginController from "../../controllers/LoginController";

interface AdminAthleticPageProps {}

const AdminAthleticPage: FC<AdminAthleticPageProps> = () => {
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
    <div className={styles.AdminAthleticPage}>
      <HandSidebar />
      <Row>
        <Col lg={12}>
          <AthleticList />
        </Col>
      </Row>
    </div>
  );
};
export default AdminAthleticPage;
