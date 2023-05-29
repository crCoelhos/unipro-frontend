import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Dropdown, Nav, NavDropdown, NavItem } from 'react-bootstrap';
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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { getSessionUser } = useLoginController();
  const user = getSessionUser();
  console.log(user)

  const scrollingLinkClassName = styles.UpperNavbarLinkTextForLight;

  if (!user) {
    return <div>Error: User not found</div>;
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark" fixed="top" className={styles.ScrollingNavBg}>
      <Container>
        <Navbar.Brand>
          <Link to="/home" className={scrollingLinkClassName}>
            UNIPRODUÇÕES
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink} to={'#'} className={scrollingLinkClassName}>
              Eventos
            </Dropdown.Toggle>
            <Dropdown.Menu variant="light">
              <Dropdown.Item>
                <Link to="/sport-events">Eventos esportivos</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/cultural-events">Eventos culturais</Link>
              </Dropdown.Item>
              <NavDropdown.Divider />
              <Dropdown.Item>
                <Link to="/events">Sobre os eventos</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Nav className="me-auto">
            <Nav.Link href="#news">
              <Link to="/news" className={scrollingLinkClassName}>
                Noticias
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/contact-us" className={scrollingLinkClassName}>
                Contato
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <Nav.Link>
                <Link to="/home" className={scrollingLinkClassName}>
                  <p>{user.name}</p>
                  {/* fazer logout */}
                </Link>
              </Nav.Link>
            ) : (
              <Nav.Link>
                <Link to="/login" className={scrollingLinkClassName}>
                  Entrar
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
