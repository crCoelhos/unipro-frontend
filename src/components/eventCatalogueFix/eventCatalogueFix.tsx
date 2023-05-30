import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './eventCatalogueFix.module.scss';
import axios from 'axios';
import EventDetails from '../../pages/EventDetails/EventDetails';

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
}

const EventCatalogueFix = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3003/admin/lots');
        const eventData = response.data.filter((event: Event) => event.event.state);
        setEvents(eventData);
        console.log(eventData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className={styles.eventCatalogueFix}>
      <ul>
        <div className="row">
          {events.map((event) => (
            <div className="col-md-3" id="eventCard" style={{ margin: '12px' }} key={event.id}>
              <Link to={`/sport-events/${event.id}`}>
                <div className="card">
                  <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <a href="#!">
                      <div className="mask"></div>
                    </a>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{event.event.name}</h5>
                    <p className="card-text">{event.event.description}</p>
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
