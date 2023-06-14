import { useState } from "react";
import axios from "axios";

const url = "http://localhost:3003";
class CategoryController {
  static createCategory = async (categoryData:{
    name: string ,
    price: number,
    startDate: string,
    finishDate: string,
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
        Access: 123,
      },
    };

    try {
      const response = await axios.post(url + "/admin/category", categoryData, config);
    } catch (error) {
      console.error(error);
    }
  };

};

export default CategoryController;
