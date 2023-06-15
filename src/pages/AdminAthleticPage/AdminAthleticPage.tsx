import React, { FC } from "react";
import styles from "./AdminAthleticPage.module.css";
import HandSidebar from "../../components/HandSidebar/HandSidebar";
import AthleticList from "../../components/AthleticList/AthleticList";
import { Row, Col } from "react-bootstrap";
import CreateAthleticModal from "../../components/CreateAthleticModal/CreateAthleticModal";

interface AdminAthleticPageProps {}

const AdminAthleticPage: FC<AdminAthleticPageProps> = () => (
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

export default AdminAthleticPage;
