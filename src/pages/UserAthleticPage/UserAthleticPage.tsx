import React, { FC } from "react";
import styles from "./UserAthleticPage.module.css";
import MainSideBar from "../../components/MainSideBar/MainSideBar";
import Menu from "../../components/Menu/Menu";
import UserProfileForm from "../../components/UserProfileForm/UserProfileForm";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";

interface UserAthleticPageProps {}

const UserAthleticPage: FC<UserAthleticPageProps> = () => (
  <div className={styles.UserAthleticPage}>
    <MainSideBar />
    <Menu />
    <UserProfileForm />
    <HomeComposedFooter />
  </div>
);

export default UserAthleticPage;
