import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePublications.module.css';
import { Card } from 'react-bootstrap';
import { publicationsMockData } from './mockfile';

interface Publication {
  id: number,
  title: string;
  headline: string;
  publicationDate: string;
  author: string;
}

const HomePublications: FC = () => {
  const [publications, setPublications] = useState<Publication[]>(publicationsMockData);
  const navigate = useNavigate();

  const handleCardClick = (publication: Publication) => {
    navigate(`/publication/${publication.id}`);
  };

  return (
    <div className={styles.HomePublications}>
      {publications.map((publication, index) => (
        <Card
          key={index}
          className={styles.PublicationCard}
          onClick={() => handleCardClick(publication)}
        >
          <Card.Body>
            <Card.Title>{publication.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{publication.headline}</Card.Subtitle>
            <Card.Text>
              <strong>Published on:</strong> {publication.publicationDate}
              <br />
              <strong>Author:</strong> {publication.author}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default HomePublications;
