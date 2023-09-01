import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "./HandSidebar.module.css";
import { FiMenu } from "react-icons/fi";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className={styles.handSidebar}
    >
      <Container>
        <div>
          <Navbar.Brand>UNIPRODUÇÕES</Navbar.Brand>
        </div>
        <div>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={styles.ToggleArea}
          >
            <FiMenu />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavLink to="/admin-area/athletics" className="nav-link">
                Atléticas
              </NavLink>
              <NavLink to="/admin-area/coupons" className="nav-link">
                Cupons
              </NavLink>
              <NavLink to="/admin-area/events" className="nav-link">
                Eventos
              </NavLink>
              <NavLink to="/admin-area/users" className="nav-link">
                Usuarios
              </NavLink>
              <NavLink to="/home" className="nav-link">
                Voltar ao site
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
