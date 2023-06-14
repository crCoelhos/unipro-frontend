import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import styles from "./HandSidebar.module.css";

const HandSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
            <li className={styles.SidebarListOptions}>
              <NavLink to="/home" className={styles.active}>
                Home
              </NavLink>
            </li>
            <li className={styles.SidebarListOptions}>
              <NavLink to="/admin-area/about" className={styles.active}>
                About
              </NavLink>
            </li>
            <li className={styles.SidebarListOptions}>
              <NavLink to="/admin-area/events" className={styles.active}>
                Eventos
              </NavLink>
            </li>
            <li className={styles.SidebarListOptions}>
              <NavLink to="/admin-area/create-events" className={styles.active}>
                Criar eventos
              </NavLink>
            </li>
            <li className={styles.SidebarListOptions}>
              <NavLink to="/admin-area/create-tickets" className={styles.active}>
                Criar ingresso
              </NavLink>
            </li>
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
