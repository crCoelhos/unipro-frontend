import React from 'react';
import { Link } from 'react-router-dom';
import styles from './eventCatalogueFix.module.scss';

export interface Event {
  id: number;
  name: string;
  tickets?: {
    [ticketId: number]: {
      id: number;
      ticket: string;
      price: number;
    };
  };
  description: string;
  image: string;
}


export const shownEvents = [
  {
    id: 1,
    name: 'Calcinha Preta',
    tickets: {
      1: {
        id: 1,
        ticket: 'Camarote',
        price: 1.99
      },
      2: {
        id: 2,
        ticket: 'Pista',
        price: 1.00
      }
    },
    description: 'Fã da banda Calcinha Preta declara seu amor e vira manchete de jornais',
    image: 'https://i.imgur.com/zsRJbYk.jpg'
  },
  {
    id: 2,
    name: 'Desejo de Menina',
    tickets: {
      1: {
        id: 1,
        ticket: 'Camarote',
        price: 59.00
      },
      2: {
        id: 2,
        ticket: 'Pista',
        price: 39.00
      }
    },
    description: 'Então case-se comigo numa noite de luar ou na manhã de um domingo à beira-mar. Diga sim pra mim',
    image: 'https://i.imgur.com/zsRJbYk.jpg'
  },
  {
    id: 3,
    name: 'Wanderley Andrade',
    tickets: {
      1: {
        id: 1,
        ticket: 'Camarote',
        price: 59.00
      },
      2: {
        id: 2,
        ticket: 'Pista',
        price: 39.00
      }
    },
    description: 'O meu amor virou brinquedo pra ti, põe na minha boca o melLogo em seguida o fel. Depois vem de mansinho querendo agradar, falando palavras bonitas pra me conquistar. Só não aceito esse teu jeito de querer me amar',
    image: 'https://i.imgur.com/zsRJbYk.jpg'
  },

];

const EventCatalogueFix = () => {
  return (
    <div className={styles.eventCatalogueFix}>
      <ul>
        <div className="row">
          {shownEvents.map(event => (

            <div className="col-md-3" id="eventCard" style={{ 'margin': '12px' }}>
              <Link to={`/cultural-events/${event.id}`}>

                <div className="card">

                  <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src={event.image} className="img-fluid" />
                    <a href="#!">
                      <div className="mask"></div>
                    </a>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <p className="card-text">{event.description}</p>
                  </div>

                </div>

              </Link>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default EventCatalogueFix;
