import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { shownEvents, Event } from '../../components/eventCatalogueFix/eventCatalogueFix';
import { useParams } from 'react-router-dom';

interface ProductCartProps {
  tickets?: Event['tickets'];
}

const ProductCart: React.FC<ProductCartProps> = ({ tickets }) => {
  const [ticketQuantities, setTicketQuantities] = useState<{ [ticketId: number]: number }>({});

  const handleIncrement = (ticketId: number) => {
    setTicketQuantities(prevQuantities => ({
      ...prevQuantities,
      [ticketId]: (prevQuantities[ticketId] || 0) + 1
    }));
  };

  const handleDecrement = (ticketId: number) => {
    setTicketQuantities(prevQuantities => {
      const quantity = prevQuantities[ticketId] || 0;
      if (quantity > 0) {
        return {
          ...prevQuantities,
          [ticketId]: quantity - 1
        };
      }
      return prevQuantities;
    });
  };

  if (!tickets) {
    return null;
  }

  const totalPrice = Object.entries(ticketQuantities).reduce((total, [ticketId, quantity]) => {
    const ticket = tickets[parseInt(ticketId)];
    const price = ticket ? ticket.price : 0;
    return total + price * quantity;
  }, 0);

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Ticket</th>
          <th>Preço</th>
          {/* <th>Preço com taxa</th> */}
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(tickets).map(([ticketId, ticket]) => {
          const ticketPriceWithTax = ticket.price + (ticket.price * 0.03);
          return (
            <tr key={ticketId}>
                <td>{ticket.ticket}</td>
              <td>R${ticket.price.toFixed(2)}</td>
              {/* <td>R${ticketPriceWithTax.toFixed(2)}</td> */}
              <td>
                <Button variant="primary" onClick={() => handleDecrement(parseInt(ticketId))}>-</Button>{' '}
                {ticketQuantities[ticket.id] || 0}
                <Button variant="primary" onClick={() => handleIncrement(parseInt(ticketId))}>+</Button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={2}>Total</td>
          <td>R${totalPrice.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  );
};

const EventDetailsPage = () => {
  const { id } = useParams<{ id?: string }>();
  const eventId = parseInt(id || '', 10);

  const event = shownEvents.find((event: { id: number; }) => event.id === eventId);

  if (!event) {
    return <div>Evento não encontrado.</div>;
  }

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <ProductCart tickets={event.tickets} />
      <button type="button">rogerio</button>
    </div>
  );
};

export default EventDetailsPage;
