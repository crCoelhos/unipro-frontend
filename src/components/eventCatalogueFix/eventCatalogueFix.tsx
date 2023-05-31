import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './eventCatalogueFix.module.scss';
import axios from 'axios';

export interface Event {
  event: any;
  id: number;
  name: string;
  tickets?: {
    [ticketId: number]: {
      id: number;
      ticket: string;
    };
  };
  description: string;
  image?: string;
}

const EventCatalogueFix = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [colorClasses, setColorClasses] = useState<string[]>([]);
  const colors = ['#04BF7B', '#4630D9', '#0000FF', '#F26241', '#A4A0FF'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3003/admin/lots');
        const eventData = response.data.filter((event: Event) => event.event.state);
        setEvents(eventData);

        const newColorClasses = eventData.map(() => {
          const randomIndex = Math.floor(Math.random() * colors.length);
          return `cardColoring-${randomIndex}`;
        });
        setColorClasses(newColorClasses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className={styles.eventCatalogueFix}>
      {/* <ul> */}
      <div className="row">
        {events.map((event, index) => {
          const colorClass = colorClasses[index];
          let colors = ['#A4A0FF'];
          // let colors = ['#04BF7B', '#4630D9', '#0000FF', '#F26241', '#A4A0FF'];
          const randomIndex = Math.floor(Math.random() * colors.length)
          return (

            <div className="col-md-3" id="eventCard" style={{ margin: '12px' }} key={event.id}>

              <Link to={`/sport-events/${event.id}`}>

                <div
                  className={`card cardColoring ${colorClass}`}
                  style={{ backgroundColor: colors[randomIndex] }}
                >

                  <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">

                    <a href="#!">
                      <div className="mask"></div>
                    </a>

                  </div>

                  <div className="card-body" style={{ color: 'white', marginTop: '12px' }}>
                    <h5 className="card-title">{event.name}</h5>
                    <hr style={{ height: '8px', backgroundColor: 'white' }} />
                    <p className="card-text">{event.event.name}</p>
                    <p className="card-text">{event.event.description}</p>

                  </div>

                </div>

              </Link>

            </div>

          );
        })}
      </div>
      {/* </ul> */}
    </div>
  );
};

export default EventCatalogueFix;
