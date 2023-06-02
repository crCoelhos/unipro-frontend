import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

const mockEventData: EventDetailsData = {
  batch: {
    id: 1,
    name: "Batch 1",
    startDate: "2023-06-10",
    finishDate: "2023-06-12",
    createdAt: "2023-05-30T09:00:00Z",
    updatedAt: "2023-05-31T15:30:00Z",
    event: {
      id: 1,
      name: "Event 1",
      state: true,
      date: "2023-06-10",
      location: "Example Venue",
      description: "This is a sample event",
      createdAt: "2023-05-29T14:20:00Z",
      updatedAt: "2023-05-30T11:45:00Z",
    },
  },
  ticketsTotal: 100,
  ticketsOpen: 75,
};

interface EventDetailsData {
  batch: {
    id: number;
    name: string;
    startDate: string;
    finishDate: string;
    createdAt: string;
    updatedAt: string;
    event: {
      id: number;
      name: string;
      state: boolean;
      date: string;
      location: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  ticketsTotal: number;
  ticketsOpen: number;
}

const url = "http://localhost:3003/";

const SportEventDetails = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState<EventDetailsData | null>(
    null
  );

  useEffect(() => {
    const dataFromStorage = sessionStorage.getItem("user");
    let token = "";

    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      token = parsedData.token;
    }

    const fetchEvents = async () => {
      try {
        const config = {
          headers: {
            Authorization: token,
          },
        };

        // console.log(token)

        const response = await axios.get(
          `${url}admin/batch/${eventId}`,
          config
        );
        setEventDetails(response.data.lot);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [eventId]);

  return (
    <MDBContainer>
      <h2>Detalhes do evento</h2>
      {mockEventData && (
        <MDBCard>
          <MDBCardBody>
            <h2>Lote: {mockEventData.batch.name}</h2>
            <h1>Título: {mockEventData.batch.event.name}</h1>
            <hr />
            <br />
            <MDBCardImage
              src="https://media.geeksforgeeks.org/wp-content/uploads/20220106105832/gfg200X2001.png"
              position="top"
            />
            <hr />
            <p>Descrição: {mockEventData.batch.event.description}</p>
            <p>Local do evento: {mockEventData.batch.event.location}</p>
            <hr />
            <p>Criado em {mockEventData.batch.event.createdAt}</p>
          </MDBCardBody>
        </MDBCard>
      )}
      <div className="purchase">
        <div>
          <button>Comprar</button>
        </div>
      </div>
    </MDBContainer>
  );
};

export default SportEventDetails;
