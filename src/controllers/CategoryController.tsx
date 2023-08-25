import { useState } from "react";
import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;
  const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;
  
class CategoryController {
  static createCategory = async (categoryData:{
    name: string ,
    price: number,
    startDate: string,
    finishDate: string,
    typeTicketId:number,
    eventId: number,
    quantity: number,
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
      const response = await axios.post(url + "admin/category", categoryData, config);
      localStorage.setItem("ingresso", response.data)
      return response
    } catch (error) {
      console.error(error);
    }
  };

};

export default CategoryController;
