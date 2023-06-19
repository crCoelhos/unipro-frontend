import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

class EventController {
  static createEvent = async (eventData: {
    name: string;
    status: number;
    date: string;
    location: string;
    policy: string | Text;
    description: string;
    bannerEvent: string;
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
      const response = await axios.post(
        `${url}admin/event`,
        eventData,
        config
      );
    } catch (error) {
      console.error(error);
    }
  };
}

export default EventController;
