import React, { FC } from "react";
import axios from "axios";
import styles from "./UserProfileOwnedTicket.module.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_SERVER_URL;

const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

const dataFromStorage = sessionStorage.getItem("user");
let token = "";
if (dataFromStorage) {
  const parsedData = JSON.parse(dataFromStorage);
  token = parsedData.token;
}

const UserProfileOwnedTicket: FC = () => {
  const [userTickets, setuserTickets] = React.useState<any[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    async function getUserTickets() {
      try {
        const response = await axios.get(`${url}admin/tickets/user`, {
          headers: { Access: serverSideAccessToken },
        });
        console.log("leticia: ", response);
        // setuserTickets();
      } catch (error) {
        console.error(error);
      }
    }
    getUserTickets();
  }, [token]);

  return (
    <div className={styles.UserProfileOwnedTicket}>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
};

export default UserProfileOwnedTicket;
