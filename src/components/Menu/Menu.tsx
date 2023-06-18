import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Menu.module.css";
import useLoginController from "../../controllers/LoginController";
import useProfileController from "../../controllers/profileController";
import uniLogoBranco from "../../assets/icons/uni2023.png";
import settingsIcon from "../../assets/icons/settings-mono-white.png";

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/index");
  };

  const { logout } = useProfileController();

  const [collapsed, setCollapsed] = useState(true);
  const [navbarBg, setNavbarBg] = useState("transparent");
  const [navbarTextColor, setNavbarTextColor] = useState("transparent");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { getSessionUser } = useLoginController();
  const user = getSessionUser();

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const navbarElement = document.querySelector(".navbar");

    if (navbarElement instanceof HTMLElement) {
      const navbarHeight = navbarElement.offsetHeight;

      if (scrollPosition > navbarHeight) {
        setNavbarBg("dark");
        setNavbarTextColor("dark");
      } else {
        setNavbarBg("transparent");
        setNavbarTextColor("transparent");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // navbar bg
  const scrollingLinkClassName = styles.UpperNavbarLinkTextForLight;

  const ScrollingNavBg = styles.ScrollingNavBg;

  if (!user) {
    return (
      <Navbar
        expand="lg"
        variant="darker"
        fixed="top"
        className={styles.navBarMain}
      >
        <Container>
          <Navbar.Brand>
            <Link to="/home" className={styles.navBarLogoLinks}>
              <img
                src={uniLogoBranco}
                alt="logo dos jogos uni 2023"
                className={styles.NavbarJogosUniLogo}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <p className={styles.navBarLogoLinks}>menu</p>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home" className={styles.navBarLogoLinks}>
                Home
              </Nav.Link>
              {/* <Nav.Link href="/about-us">Contate</Nav.Link> */}
              <Nav.Link href="/sport-events" className={styles.navBarLogoLinks}>
                Eventos
              </Nav.Link>
              {/* <NavDropdown title="Eventos" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/sport-events" className={styles.navBarMenuLinks}>
                    Eventos esportivos
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/cultural-events"
                    className={styles.navBarMenuLinks}
                  >
                    Eventos culturais
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/about-events" className={styles.navBarMenuLinks}>
                    Sobre os eventos
                  </Link>
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {user ? (
                <Nav>
                  <Link to="/home" className={scrollingLinkClassName}>
                    <p>usuario não encntrado</p>
                  </Link>
                </Nav>
              ) : (
                <Nav.Link>
                  <Link
                    to="/login"
                    style={{ fontSize: "23px", fontWeight: "bolder" }}
                    className={styles.navBarMenuLinks}
                  >
                    Entrar
                  </Link>
                </Nav.Link>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar
      expand="lg"
      variant="dark"
      fixed="top"
      className={styles.navBarMain}
    >
      <Container>
        <Navbar.Brand>
          <Link to="/home" className={styles.navBarLogoLinks}>
            <img
              src={uniLogoBranco}
              alt="logo dos jogos uni 2023"
              className={styles.NavbarJogosUniLogo}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <p className={styles.navBarLogoLinks}>menu</p>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home" className={styles.navBarLogoLinks}>
              Home
            </Nav.Link>
            {/* <Nav.Link href="/about-us">Contate</Nav.Link> */}
            <Nav.Link href="/sport-events" className={styles.navBarLogoLinks}>
              Eventos
            </Nav.Link>
            {/* <NavDropdown title="Eventos" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/sport-events" className={styles.navBarMenuLinks}>
                    Eventos esportivos
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/cultural-events"
                    className={styles.navBarMenuLinks}
                  >
                    Eventos culturais
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/about-events" className={styles.navBarMenuLinks}>
                    Sobre os eventos
                  </Link>
                </NavDropdown.Item>
              </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {user ? (
              <Nav className="me-auto">
                <NavDropdown
                  title={user.name}
                  id="basic-nav-dropdown"
                  style={{ fontSize: "23px", fontWeight: "bolder", color: "" }}
                  className={styles.navBarMenuLinks}
                >
                  <NavDropdown.Item>
                    <Link to="/user-profile" className={styles.navBarMenuLinks}>
                      <span
                        className={styles.adminSection}
                        style={{ fontSize: "18px" }}
                      >
                        Perfil
                      </span>
                    </Link>
                  </NavDropdown.Item>

                  {user.role === "ADMIN" && (
                    <NavDropdown.Item>
                      <Link to="/admin-area" className={styles.navBarMenuLinks}>
                        <span
                          className={styles.adminSection}
                          style={{ fontSize: "18px" }}
                        >
                          Dashboard
                        </span>
                      </Link>
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link
                      to="/home"
                      className={styles.navBarMenuLinks}
                      onClick={handleLogout}
                    >
                      <span
                        className={styles.adminSection}
                        style={{ fontSize: "18px" }}
                      >
                        Logout
                      </span>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              // <Nav>
              //   <Link to="/home" onClick={handleLogout} className={scrollingLinkClassName}>
              //     <span className={styles.userSpanName}>Seja bem vindo, {user.name}</span>
              //   </Link>
              // {user.role === "ADMIN" && (
              //   <Link to="/admin-area" className={scrollingLinkClassName}>
              //     <span className={styles.userSpanRole}>
              //     Configurações
              //     </span>
              //   </Link>
              // )}
              // </Nav>
              <Nav.Link>
                <Link to="/login">Entrar</Link>
              </Nav.Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
