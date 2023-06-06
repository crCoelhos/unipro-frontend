import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./eventCatalogueFix.module.scss";
import axios from "axios";

const url = "http://localhost:3003/";

export interface Event {
  id: number;
  name: string;
  state: boolean;
  date: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const EventCatalogueFix = () => {
  let navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [colorClasses, setColorClasses] = useState<string[]>([]);
  const colors = ["#04BF7B", "#4630D9", "#0000FF", "#F26241", "#A4A0FF"];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(url + "admin/events");
        const eventData: Event[] = response.data;
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

  const filteredEvents = events.filter((event) => event.state);

  return (
    <div className={styles.eventCatalogueFix}>
      <div className="row">
        {filteredEvents.map((event, index) => {
          const colorClass = colorClasses[index];
          const randomIndex = Math.floor(Math.random() * colors.length);
          return (
            <div
              className="col-lg-3 col-md-5"
              id="eventCard"
              style={{ margin: "12px" }}
              key={event.id}
            >
              <Link to={`/sport-events/${event.id}`}>
                <div
                  className={`card cardColoring ${colorClass}`}
                  style={{
                    backgroundColor: colors[randomIndex],
                    height: "300px",
                  }}
                >
                  <div
                    className="bg-image hover-overlay ripple"
                    data-mdb-ripple-color="light"
                  >
                    <a href="#!">
                      <div className="mask"></div>
                    </a>
                  </div>

                  <div
                    className="card-body"
                    style={{ color: "white", marginTop: "12px" }}
                  >
                    <h5 className="card-title">{event.name}</h5>
                    <hr style={{ height: "8px", backgroundColor: "white" }} />
                    <p className="card-text">{event.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCatalogueFix;
