import React, { FC } from "react";
import styles from "./sportEventPage.module.scss";
import EventCatalogue from "../../components/eventCatalogueFix/eventCatalogueFix";
import HomeFooter from "../../components/homeFooter/homeFooter";
import UpperNavbar from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import CreateEventModal from "../../components/CreateEventModal/CreateEventModal";

interface SportEventPageProps {}

const SportEventPage: FC<SportEventPageProps> = () => (
  <div className={styles.SportEventPage}>
    <UpperNavbar />
    <span>
      <CreateEventModal />
      <h1>Esportes</h1>
    </span>
    <hr />
    <EventCatalogue />
    <HomeComposedFooter />
  </div>
);

export default SportEventPage;
