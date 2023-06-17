import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AdminEventPage.module.css";
import AdminEventCatalogue from "../../components/AdminEventCatalogue/AdminEventCatalogue";
import HandSidebar from "../../components/HandSidebar/HandSidebar";
import { Row, Col } from "react-bootstrap";
import EventCatalogueFix from "../../components/eventCatalogueFix/eventCatalogueFix";
import CreateEventModal from "../../components/CreateEventModal/CreateEventModal";
import { useNavigate } from "react-router-dom";
import useLoginController from "../../controllers/LoginController";

const AdminEventPage = () => {
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
    <div className={styles.AdminEventPage}>
      <Row>
        <Col lg={3}>
          <HandSidebar />
        </Col>
        <Col lg={9}>
          <EventCatalogueFix />
          <CreateEventModal />
        </Col>
      </Row>
    </div>
  );
};
AdminEventPage.propTypes = {};

AdminEventPage.defaultProps = {};

export default AdminEventPage;
