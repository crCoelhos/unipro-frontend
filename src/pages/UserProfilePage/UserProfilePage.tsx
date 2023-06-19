import React, { FC } from "react";
import styles from "./UserProfilePage.module.css";
import Menu from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import UserProfileForm from "../../components/UserProfileForm/UserProfileForm";

interface UserProfilePageProps {}

const UserProfilePage: FC<UserProfilePageProps> = () => (
  <div className={styles.UserProfilePage}>
    <Menu />
    <UserProfileForm />
    <HomeComposedFooter />
  </div>
);

export default UserProfilePage;
