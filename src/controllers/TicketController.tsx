import { useState } from "react";
import axios from "axios";

const url = "http://localhost:3003";
const useTicketController = () => {
  const [ticketData, setTicketData] = useState({
    name: "",
    price: 0.00,
    startDate: "",
    finishDate: "",
    eventId: 0,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setTicketData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createTicket = async () => {
    const dataFromStorage = sessionStorage.getItem("user");
    let token = "";

    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      token = parsedData.token;
    }

    const config = {
      headers: {
        Authorization: token,
        Access: 123,
      },
    };

    try {
      const response = await axios.post(url + "/admin/ticket", ticketData, config);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ticketData,
    handleChange,
    createTicket,
  };
};

export default useTicketController;
