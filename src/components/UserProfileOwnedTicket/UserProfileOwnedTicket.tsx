import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserProfileOwnedTicket.module.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserTickets } from "../../types";
import { format } from "date-fns";
const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

const dataFromStorage = sessionStorage.getItem("user");
let token = "";
if (dataFromStorage) {
  const parsedData = JSON.parse(dataFromStorage);
  token = parsedData.token;
}

const UserProfileOwnedTicket: FC = () => {
  const [userTickets, setUserTickets] = useState<UserTickets[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserTickets() {
      try {
        const response = await axios.get(`${url}admin/tickets/user`, {
          headers: { Access: serverSideAccessToken, Authorization: token },
        });
        const ticketData: UserTickets[] = response.data;
        setUserTickets(ticketData);
      } catch (error) {
        console.error(error);
      }
    }
    getUserTickets();
  }, [token]);

  return (
    <div className={styles.UserProfileOwnedTicket}>
      <Card className={styles.UserProfileOwnedTicketTickets}>
        <Card bg="secondary" className={styles.UserProfileOwnedTicketBoxTitle}>
          <Card.Text className="text-center">Ingressos</Card.Text>
        </Card>
        {userTickets.map((ticket) => (
          <Card key={ticket.id} className={styles.TicketUnity} bg="info">
            <Card.Header className="text-center">
              {ticket.ticket.event.name}
            </Card.Header>
            <Card.Body>
              <Card.Text className={styles.CardText}>
                <span>Ingresso: </span> <span>{ticket.ticket.name}</span>
              </Card.Text>
              <Card.Text className={styles.CardText}>
                <span>Preço: </span> <span>R$ {ticket.ticket.price}</span>
              </Card.Text>
              <Card.Text className={styles.CardText}>
                <span>Situação: </span> <span>{ticket.status}</span>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Card.Text className={styles.CardFooter}>
                <span>
                  Evento: {ticket.ticket.event.status ? "Ativo" : "Inativo"}
                </span>
                <span>
                  Comprado em:
                  {format(new Date(ticket.updatedAt), "dd/MM/yyyy")}
                </span>
              </Card.Text>
            </Card.Footer>
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default UserProfileOwnedTicket;
