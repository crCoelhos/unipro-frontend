import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './Menu.module.css';
import useLoginController from '../../controllers/LoginController';
import useProfileController from '../../controllers/profileController';

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/index');
  };

  const { logout } = useProfileController();

  const [collapsed, setCollapsed] = useState(true);
  const [navbarBg, setNavbarBg] = useState('transparent');
  const [navbarTextColor, setNavbarTextColor] = useState('transparent');

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { getSessionUser } = useLoginController();
  const user = getSessionUser();
  console.log(user);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const navbarElement = document.querySelector('.navbar');

    if (navbarElement instanceof HTMLElement) {
      const navbarHeight = navbarElement.offsetHeight;

      if (scrollPosition > navbarHeight) {
        setNavbarBg('dark');
        setNavbarTextColor('dark');
      } else {
        setNavbarBg('transparent');
        setNavbarTextColor('transparent');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // navbar bg
  const scrollingLinkClassName = styles.UpperNavbarLinkTextForLight;

  const ScrollingNavBg = styles.ScrollingNavBg;

  if (!user) {
    return (
      <Navbar bg="dark" variant='dark' expand="lg" fixed='top'>
        <Container>
          <Navbar.Brand>
            <Link to="/home" className={styles.navBarLogoLinks}>
              {/* <Link to="/home" className={scrollingLinkClassName} > */}
              UNIPRODUÇÕES
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <p className={styles.navBarLogoLinks}>
              menu
            </p>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home" className={styles.navBarLogoLinks}>Home</Nav.Link>
              <Nav.Link href="/about-us">Contate</Nav.Link>
              <NavDropdown title="Eventos" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/sport-events" className={styles.navBarMenuLinks} >
                    Eventos esportivos
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/cultural-events" className={styles.navBarMenuLinks}>
                    Eventos culturais
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                  <Link to="/about-events" className={styles.navBarMenuLinks}>
                    Sobre os eventos
                  </Link>
  
                </NavDropdown.Item>
              </NavDropdown>
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
                  <Link to="/login" className={scrollingLinkClassName}>
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
    <Navbar bg="dark" variant='dark' expand="lg" fixed='top'>
      <Container>
        <Navbar.Brand>
          <Link to="/home" className={styles.navBarLogoLinks}>
            {/* <Link to="/home" className={scrollingLinkClassName} > */}
            UNIPRODUÇÕES
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <p className={styles.navBarLogoLinks}>
            menu
          </p>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home" className={styles.navBarLogoLinks}>Home</Nav.Link>
            <Nav.Link href="/about-us">Contate</Nav.Link>
            <NavDropdown title="Eventos" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/sport-events" className={styles.navBarMenuLinks} >
                  Eventos esportivos
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/cultural-events" className={styles.navBarMenuLinks}>
                  Eventos culturais
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                <Link to="/about-events" className={styles.navBarMenuLinks}>
                  Sobre os eventos
                </Link>

              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Autenticado como:
            {user ? (
              <Nav>
                <Link to="/home"  onClick={handleLogout} className={scrollingLinkClassName}>
                  <p>{user.name}</p>
                </Link>
              </Nav>
            ) : (
              <Nav.Link>
                <Link to="/login" className={scrollingLinkClassName}>
                  Entrar
                </Link>
              </Nav.Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
