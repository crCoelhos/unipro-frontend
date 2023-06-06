import axios from 'axios';

class EventController {
  static createEvent = async (eventData: {
    name: string;
    state: number;
    date: string;
    location: string;
    description: string;
  }) => {
    const dataFromStorage = sessionStorage.getItem('user');
    let token = '';

    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      token = parsedData.token;
    }

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:3003/admin/event',
        eventData,
        config
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
}

export default EventController;
