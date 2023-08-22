import { useState } from "react";
import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;
  const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;
  
class ModalityController {
  static createModality = async (modalityData:{
    name: string ,
    description: string,
    eventId: number,
  }) => {
    const dataFromStorage = sessionStorage.getItem("user");
    let token = "";

    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      token = parsedData.token;
    }

    const config = {
      headers: {
        Authorization: token,
        Access: serverSideAccessToken,
      },
    };

    try {
      await axios.post(url + "admin/modality", modalityData, config);
    } catch (error) {
      console.error(error);
    }
  };

};

export default ModalityController;
