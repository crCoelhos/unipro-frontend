import { useState } from "react";
import axios from "axios";
import { Athletic } from "../types";

const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

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
        Access: serverSideAccessToken,
      },
    };

    try {
      const response = await axios.post(
        url + "/athletic",
        athleticData,
        config
      );
    } catch (error) {
      console.error(error);
    }
  };
}

export default AthleticController;
