import React, { FC } from 'react';
import styles from './eventCard.module.scss';
import { Link } from 'react-router-dom';


const EventCard: React.FC = () => (
  <div className={styles.EventCard}>
    <Link to="">

      <div className="card">
        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
          <img src="https://i.imgur.com/zsRJbYk.jpg" className="img-fluid" />
          <a href="#!">
            <div className="mask"></div>
          </a>
        </div>
        <div className="card-body">
          <h5 className="card-title">Rogerio</h5>
          <p className="card-text">Eu pensei em escrever alguns poemas, Só pra tocar seu coração. Eu sei, uma pitada de romance é bom. Meu bem, eu tô pedindo a sua mão</p>
        </div>
      </div>

    </Link>
  </div >
);

export default EventCard;
