import React, { FC } from "react";
import styles from "./UserProfilePage.module.css";
import Menu from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import UserProfileForm from "../../components/UserProfileForm/UserProfileForm";
import MainSideBar from "../../components/MainSideBar/MainSideBar";

interface UserProfilePageProps {}

const UserProfilePage: FC<UserProfilePageProps> = () => (
  <div className={styles.UserProfilePage}>
    <MainSideBar />
    <Menu />
    <UserProfileForm />
    <HomeComposedFooter />
  </div>
);

export default UserProfilePage;
