import React, { FC } from 'react';
import styles from './culturalEventPage.module.scss';
import EventCard from '../../components/eventCard/eventCard';
import { Container, Row, Col } from 'react-bootstrap';
import UpperNavbar from '../../components/Menu/Menu';
import HomeFooter from '../../components/homeFooter/homeFooter';
import EventCatalogueFix from '../../components/eventCatalogueFix/eventCatalogueFix';

interface CulturalEventPageProps { }

const CulturalEventPage: FC<CulturalEventPageProps> = () => (
  <div className={styles.CulturalEventPage}>
    <UpperNavbar />
    <h1>Cultura</h1>
    <hr />

    <EventCatalogueFix />
    <HomeFooter />
  </div>
);

export default CulturalEventPage;
