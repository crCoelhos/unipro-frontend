import { useState } from "react";
import axios from "axios";
import { Athletic } from "../types";

const url = "http://localhost:3003";

class AthleticController {
  static createAthletic = async (athleticData: Athletic) => {
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
      const response = await axios.post(
        url + "/athletic",
        athleticData,
        config
      );
      console.log('leticia: ',response);
    } catch (error) {
      console.error(error);
    }
  };
}

export default AthleticController;