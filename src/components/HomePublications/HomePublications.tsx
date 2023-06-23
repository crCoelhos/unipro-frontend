import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePublications.module.css";
import { Card } from "react-bootstrap";
import { publicationsMockData } from "./mockfile";
import { Publication } from "../../types";

const HomePublications: FC = () => {
  const [publications, setPublications] =
    useState<Publication[]>(publicationsMockData);
  const navigate = useNavigate();

  const handleCardClick = (publication: Publication) => {
    navigate(`/publication/${publication.id}`);
  };

  return (
    <div className={styles.HomePublications}>
      {publications.map((publication, index) => {
        let cardBg;
        switch (publication.genre) {
          case "sport":
            cardBg = "warning";
            break;
          case "cultural":
            cardBg = "success";
            break;
          case "academic":
            cardBg = "info";
            break;
          case "luto":
            cardBg = "</div>dark";
            break;
          default:
            cardBg = ""; // Não há classe de cor definida para o valor padrão
            break;
        }

        return (
          <Card
            key={index}
            className={styles.PublicationCard}
            onClick={() => handleCardClick(publication)}
            bg={cardBg}
            text="white"
          >
            <Card.Body>
              <Card.Title style={{ fontSize: "2em" }}>
                {publication.title}
              </Card.Title>
              <Card.Text style={{ fontSize: "1.4em" }} className="mb-2">
                {publication.headline}
              </Card.Text>
            </Card.Body>
            <footer className={styles.PublicationCardMetaData}>
              <span className={styles.PublicationCardAuthor}>
                Autor: {publication.author}
              </span>
              <span className={styles.PublicationCardPublicationdDate}>
                Publicado em:{publication.publicationDate}
              </span>
            </footer>
          </Card>
        );
      })}
    </div>
  );
};

export default HomePublications;
