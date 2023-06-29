import React, { FC } from "react";
import styles from "./UserPurchasesPage.module.css";
import MainSideBar from "../../components/MainSideBar/MainSideBar";
import Menu from "../../components/Menu/Menu";
import UserProfileForm from "../../components/UserProfileForm/UserProfileForm";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";

interface UserPurchasesPageProps {}

const UserPurchasesPage: FC<UserPurchasesPageProps> = () => (
  <div className={styles.UserPurchasesPage}>
    <MainSideBar />
    <Menu />
    <UserProfileForm />
    <HomeComposedFooter />
  </div>
);

export default UserPurchasesPage;
