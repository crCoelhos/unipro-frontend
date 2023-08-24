import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import styles from "./HandSidebar.module.css";

const HandSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  const checkUserToken = () => {
    const userToken = sessionStorage.getItem('user');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
      return navigate('/login');
    }
    setIsLoggedIn(true);
  }
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`${styles["hand-sidebar"]} ${sidebarOpen ? styles.open : ""}`}
    >
      <div className={styles["sidebar-toggle"]} onClick={toggleSidebar}>
        <MDBIcon icon={sidebarOpen ? "chevron-left" : "chevron-right"} />
      </div>
      {sidebarOpen && (
        <nav className={styles["sidebar-nav"]}>
          <ul>
            <li className={styles.SidebarListOptions} >
              <NavLink to="/home" className={styles.active}>
                Voltar
              </NavLink>
            </li>
            <li className={styles.SidebarListOptions}>
              <NavLink to="/admin-area/athletics" className={styles.active}>
                Atléticas
              </NavLink>
            </li>
            <li className={styles.SidebarListOptions}>
              <NavLink to="/admin-area/events" className={styles.active}>
                Eventos
              </NavLink>
            </li>
            {/* <li className={styles.SidebarListOptions}>
              <NavLink to="/admin-area/create-events" className={styles.active}>
                Criar eventos
              </NavLink>
            </li> */}
            
            <li className={styles.SidebarListOptions}>
              <NavLink to="/admin-area/users" className={styles.active}>
                Usuarios
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HandSidebar;
