import React, { FC } from "react";
import styles from "./UserProfilePage.module.css";
import Menu from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import UserProfileForm from "../../components/UserProfileForm/UserProfileForm";
import UserProfileOwnedTicket from "../../components/UserProfileOwnedTicket/UserProfileOwnedTicket";

interface UserProfilePageProps {}

const UserProfilePage: FC<UserProfilePageProps> = () => (
  <div className={styles.UserProfilePage}>
    <Menu />
    <UserProfileForm />
    <UserProfileOwnedTicket />
    <HomeComposedFooter />
  </div>
);

export default UserProfilePage;
