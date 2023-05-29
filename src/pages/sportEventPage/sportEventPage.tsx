import React, { FC } from 'react';
import styles from './sportEventPage.module.scss';
import EventCatalogue from '../../components/eventCatalogueFix/eventCatalogueFix';
import HomeFooter from '../../components/homeFooter/homeFooter';
import UpperNavbar from '../../components/Menu/Menu';

interface SportEventPageProps { }

const SportEventPage: FC<SportEventPageProps> = () => (
  <div className={styles.SportEventPage}>
    <UpperNavbar/>
    <h1>Esportes</h1>
    <hr />
    <EventCatalogue/>
    <HomeFooter />
  </div>
);

export default SportEventPage;
