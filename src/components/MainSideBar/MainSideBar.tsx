import React, { FC, useEffect, useState } from "react";
import styles from "./MainSideBar.module.css";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate, NavLink } from "react-router-dom";

interface MainSideBarProps {}

const MainSideBar: FC<MainSideBarProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`${styles["main-sidebar"]} ${sidebarOpen ? styles.open : ""}`}
    >
      <div className={styles["sidebar-toggle"]} onClick={toggleSidebar}>
        <MDBIcon icon={sidebarOpen ? "chevron-left" : "chevron-right"} />
      </div>
      {sidebarOpen && (
        <nav className={styles["sidebar-nav"]}>
          <ul>
            <li className={styles.SidebarListOptions}>
              <NavLink to="/home" className={styles.active}>
                Voltar
              </NavLink>
            </li>
            <li className={styles.SidebarListOptions}>
              <NavLink to="/user-profile/my-purchases" className={styles.active}>
                Compras
              </NavLink>
            </li>
            <li className={styles.SidebarListOptions}>
              <NavLink to="/user-profile" className={styles.active}>
                Meus dados
              </NavLink>
            </li>
            <li className={styles.SidebarListOptions}>
              <NavLink to="/user-profile/my-athletic" className={styles.active}>
                Minha atlética
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MainSideBar;
