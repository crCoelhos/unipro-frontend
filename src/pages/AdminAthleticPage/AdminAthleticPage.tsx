import React, { FC, useEffect } from "react";
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
      <Row>
        <Col lg={3}>
          <HandSidebar />
        </Col>
        <Col lg={9}>
          <AthleticList />
          <CreateAthleticModal />
        </Col>
      </Row>
    </div>
  );
};
export default AdminAthleticPage;
