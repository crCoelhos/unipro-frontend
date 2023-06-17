import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./CreateEventPage.module.css";
import Menu from "../../components/Menu/Menu";
import CreateEventBox from "../../components/CreateEventBox/CreateEventBox";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import { useNavigate } from "react-router-dom";
import useLoginController from "../../controllers/LoginController";

const CreateEventPage: React.FC = () => {
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
    <div className={styles.CreateEventPage}>
      <Menu />
      <CreateEventBox />
      <HomeComposedFooter />
    </div>
  );

  CreateEventPage.propTypes = {};

  CreateEventPage.defaultProps = {};
};
export default CreateEventPage;
