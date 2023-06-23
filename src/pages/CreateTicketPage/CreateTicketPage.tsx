import React, { useEffect } from "react";
import styles from "./CreateTicketPage.module.css";
import CreateTicketForm from "../../components/CreateTicketForm--dashed/CreateTicketForm";
import Menu from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLoginController from "../../controllers/LoginController";

const CreateTicketPage = () => {
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
    <div className={styles.CreateTicketPage}>
      <Menu />
      <Container>
        <CreateTicketForm />
      </Container>

      <HomeComposedFooter />
    </div>
  );
};


CreateTicketPage.propTypes = {};

CreateTicketPage.defaultProps = {};
export default CreateTicketPage;
