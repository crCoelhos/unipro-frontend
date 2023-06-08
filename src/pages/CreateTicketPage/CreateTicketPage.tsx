import React from "react";
import styles from "./CreateTicketPage.module.css";
import CreateTicketForm from "../../components/CreateTicketForm/CreateTicketForm";
import Menu from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import { Container } from "react-bootstrap";

const CreateTicketPage = () => (
  <div className={styles.CreateTicketPage}>
    <Menu />
    <Container>
      <CreateTicketForm />
    </Container>

    <HomeComposedFooter />
  </div>
);

CreateTicketPage.propTypes = {};

CreateTicketPage.defaultProps = {};

export default CreateTicketPage;
