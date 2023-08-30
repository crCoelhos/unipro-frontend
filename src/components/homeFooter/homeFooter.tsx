import React, { FC, useState, useEffect } from "react";
import styles from "./homeFooter.module.scss";
import HomeFooterCreatedBy from "../homeFooterCreatedBy/homeFooterCreatedBy";
import HomeFooterSponsors from "../homeFooterSponsors/homeFooterSponsors";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import cx from "classnames";

import { Sponsors } from "../../types";

import sticker from "../../assets/img/JOGOSUNI_2023.png";

export const shownSponsors = [
  {
    id: 1,
    name: "FDUA",
    url: "javascript:void(0)",
    image: "https://i.imgur.com/Smd0jXB.jpeg",
  },
  {
    id: 2,
    name: "Life Show",
    url: "javascript:void(0)",
    image: "https://i.imgur.com/JWLByVk.jpg",
  },
  {
    id: 3,
    name: "Sem Fronteiras",
    url: "javascript:void(0)",
    image: "https://i.imgur.com/l4vHuIE.png",
  },
  {
    id: 4,
    name: "FAFTV - Futevôlei",
    url: "javascript:void(0)",
    image: "https://i.imgur.com/Muo3doP.jpg",
  },
];

const HomeFooter: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // func pra monitorar a largura da janela
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // se a largura da tela bater 1019, retorna bool pra alterar o conteudo da div.wideLarge para um link
  const shouldRenderLink = windowWidth < 1020;

  return (
    <div className={styles.HomeFooter}>
      <div className={styles.HomeFooterContainer}>
        <div>
          <div className="wideLarge">
            {shouldRenderLink ? (
              <Row className={styles.sponsorRow}>
                <Col>
                  <Link to="#link" className={styles.sponsorLabelText}>
                    Conheça nossos parceiros clicando aqui
                  </Link>
                </Col>
              </Row>
            ) : (
              <>
                { <Row>
                  {shownSponsors.map((event) => (
                    <div
                      className="col-md-3"
                      id="eventCard"
                      style={{ margin: "12px", width: "248px" }}
                    >
                      <Link to={event.url} title={event.name}>
                        <div className="card" id="teste">
                          <div
                            className="bg-image hover-overlay ripple"
                            data-mdb-ripple-color="light"
                          >
                            <img src={event.image} className="img-fluid" />
                            <a href={event.url}>
                              <div className="mask"></div>
                            </a>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Row> }
                <Row>
                  <Col className={styles.SponsorFooter}>
                    <div>
                      <h4 className={styles.sponsorRow}>
                        Todos os direitos reservados <span>UniProduções</span>
                      </h4>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </div>
        </div>
        <img src={sticker} alt="" className={styles.StickerImage} />
      </div>
    </div>
  );
};

export default HomeFooter;
