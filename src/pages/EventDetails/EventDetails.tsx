import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h2>Sport Event Details</h2>
      {eventDetails && (
        <div>
          <p>Lote: {eventDetails.name}</p>
          <p>Event Name: {eventDetails.event.name}</p>
          <p>Event Description: {eventDetails.event.description}</p>
          <p>Event location: {eventDetails.event.location}</p>
          <p>criado: {eventDetails.event.createdAt}</p>

        </div>
      )}
    </div>
  );
};

export default SportEventDetails;
