import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

interface EventDetailsData {
  event: {
    createdAt: string;
    date: string;
    description: string;
    id: number;
    location: string;
    name: string;
    state: boolean;
    updatedAt: string;
    finishDate: string;
    startDate: string;
  };
  id: number;
  name: string;
  description: string;
}

const url = "http://localhost:3003/";

const SportEventDetails = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState<EventDetailsData | null>(null);

  useEffect(() => {
    const dataFromStorage = sessionStorage.getItem('user');
    let token = '';

    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      token = parsedData.token;
    }

    const fetchEvents = async () => {
      try {
        const config = {
          headers: {
            Authorization: token
          }
        };

        const response = await axios.get(`${url}admin/lot/${eventId}`, config);
        setEventDetails(response.data.lot);
        console.log(eventDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [eventId]);

  return (
    <MDBContainer>
      <h2>Detalhes do evento</h2>
      {eventDetails && (
        <MDBCard>
          <MDBCardBody>
            <h2>Lote: {eventDetails.name}</h2>
            <h1>Título: {eventDetails.event.name}</h1>
            <hr />
            <br />
            <p>Descrição: {eventDetails.event.description}</p>
            <p>Local do evento: {eventDetails.event.location}</p>
            <hr />
            <p>Criado em {eventDetails.event.createdAt}</p>
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
