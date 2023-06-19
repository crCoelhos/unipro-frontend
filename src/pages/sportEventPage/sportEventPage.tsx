import React, { FC } from "react";
import styles from "./sportEventPage.module.scss";
import EventCatalogue from "../../components/eventCatalogueFix/eventCatalogueFix";
import HomeFooter from "../../components/homeFooter/homeFooter";
import UpperNavbar from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import CreateEventModal from "../../components/CreateEventModal/CreateEventModal";
import useLoginController from "../../controllers/LoginController";

interface SportEventPageProps {}


const SportEventPage: FC<SportEventPageProps> = () => {
  const { getSessionUser } = useLoginController();
  const user = getSessionUser();
  console.log("leticia: ", user);

  const isAdmin = user?.role === 'ADMIN'; // Verifica se o usuário existe e se o user.role é 'ADMIN' -- o react não deixa fazer isso dentro do rendering

  return (
    <div className={styles.SportEventPage}>
      <UpperNavbar />
      <span>
        {isAdmin && <CreateEventModal />}
        <h1>Esportes</h1>
      </span>
      <hr />
      <EventCatalogue />
      <HomeComposedFooter />
    </div>
  );
};
export default SportEventPage;
