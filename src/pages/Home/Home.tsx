import React from "react";
import styles from "./Home.module.css";
import Menu from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import AltSideBar from "../../components/AltSideBar/AltSideBar";
import HandSidebar from "../../components/HandSidebar/HandSidebar";
import HomePublicationsContainer from "../../components/HomePublicationsContainer/HomePublicationsContainer";
import { Row, Col } from "react-bootstrap";
import HomeInfoCardsContainer from "../../components/HomeInfoCards/HomeInfoCards";
import GeneralUseCarousel from "../../components/GeneralUseCarousel/GeneralUseCarousel";

const Home: React.FC = () => {
  return (
    <div className={styles.homeContent}>
      <Menu />
      <Row>
        <GeneralUseCarousel/>
      </Row>
      <Row style={{width:"99vw"}}>
        <Col xl={8}>
          <HomePublicationsContainer />
        </Col>
        <Col xl={3}>
          <HomeInfoCardsContainer />
        </Col>
      </Row>

      <HomeComposedFooter />
    </div>
  );
};

export default Home;
