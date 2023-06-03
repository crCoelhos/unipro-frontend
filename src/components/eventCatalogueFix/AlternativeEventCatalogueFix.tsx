import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const renderRows = (events: Event[]) => {
    const rows: JSX.Element[] = [];
    let currentRow: Event[] = [];

    events.forEach((event, index) => {
      currentRow.push(event);

      if (currentRow.length === 4 || index === events.length - 1) {
        const cells = currentRow.map((rowEvent) => {
          const colorClass = colorClasses[rowEvent.id - 1];
          const randomIndex = Math.floor(Math.random() * colors.length);
          return (
            <td key={rowEvent.id}>
              <Link to={`/sport-events/${rowEvent.id}`}>
                <div
                  className={`card cardColoring ${colorClass}`}
                  style={{
                    backgroundColor: colors[randomIndex],
                    width: "300px", 
                    height: "350px", 
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
                    <h5 className="card-title">{rowEvent.name}</h5>
                    <hr
                      style={{
                        height: "8px",
                        backgroundColor: "white",
                      }}
                    />
                    <p className="card-text">{rowEvent.description}</p>
                  </div>
                </div>
              </Link>
            </td>
          );
        });

        rows.push(<tr key={rows.length}>{cells}</tr>);
        currentRow = [];
      }
    });

    return rows;
  };

  return (
    <div className={styles.eventCatalogueFix}>
      <table>
        <tbody>{renderRows(events)}</tbody>
      </table>
    </div>
  );
};

export default EventCatalogueFix;
