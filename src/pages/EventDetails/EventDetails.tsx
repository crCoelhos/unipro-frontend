import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface EventDetailsProps {
  eventId: number;
}

interface EventDetailsData {
  event: any;
  id: number;
  name: string;
  description: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId }) => {
  const [eventDetails, setEventDetails] = useState<EventDetailsData | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/admin/lot/${eventId}`);
        setEventDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!eventDetails) {
    return <div>Evento não pode ser carregado, aguarde...</div>;
  }

  return (
    <div>
      <h2>{eventDetails.name}</h2>
      <p>{eventDetails.description}</p>
      {/* Render other event details here */}
    </div>
  );
};

export default EventDetails;
