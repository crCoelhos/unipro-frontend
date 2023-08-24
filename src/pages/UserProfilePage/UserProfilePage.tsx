import React, { FC } from "react";
import styles from "./UserProfilePage.module.css";
import Menu from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import UserProfileForm from "../../components/UserProfileForm/UserProfileForm";
import UserProfileOwnedTicket from "../../components/UserProfileOwnedTicket/UserProfileOwnedTicket";
import { Row, Col, Container } from "react-bootstrap";

interface UserProfilePageProps {}

const UserProfilePage: FC<UserProfilePageProps> = () => (
  <div className={styles.UserProfilePage}>
    <Menu />
    <Container fluid> 
      <Row>
        <Col xg={6} lg={8}>
          <UserProfileForm />
        </Col>
        <Col xg={6} lg={4} md={12} sm={12}>
          <UserProfileOwnedTicket />
        </Col>
      </Row>
    </Container>
    <HomeComposedFooter />
  </div>
);

export default UserProfilePage;
