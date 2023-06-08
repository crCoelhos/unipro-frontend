import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeInfoCards.module.css';
import { Card } from 'react-bootstrap';
import { infoCardsMockData } from './mockfile';
import { InfoCard } from '../../types';




const HomeInfoCards: FC = () => {
  const [infoCards, setInfoCards] = useState<InfoCard[]>(infoCardsMockData);
  const navigate = useNavigate();

  const handleCardClick = (infoCard: InfoCard) => {
    navigate(`/info-card/${infoCard.id}`);
  };

  return (
    <div className={styles.HomeInfoCards}>
      {infoCards.map((infoCard) => (
        <Card
          key={infoCard.id}
          className={styles.InfoCard}
          onClick={() => handleCardClick(infoCard)}
        >
          <Card.Body>
            <Card.Title>{infoCard.title}</Card.Title>
            <Card.Text>{infoCard.description}</Card.Text>
            <Card.Subtitle className="mb-2 text-muted">{infoCard.category}</Card.Subtitle>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default HomeInfoCards;
