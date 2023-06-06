import React from "react";
import styles from "./Home.module.css";
import Menu from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import AltSideBar from "../../components/AltSideBar/AltSideBar";
import HandSidebar from "../../components/HandSidebar/HandSidebar";
import HomePublicationsContainer from "../../components/HomePublicationsContainer/HomePublicationsContainer";
import { Row, Col } from "react-bootstrap";

const Home: React.FC = () => {
  return (
    <div className={styles.homeContent}>
      <Menu />
      <Row>
        <Col>
          <HomePublicationsContainer />
        </Col>
        <Col></Col>
      </Row>

      <HomeComposedFooter />
    </div>
  );
};

export default Home;
