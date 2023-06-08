import axios from 'axios';

class EventController {
  static createEvent = async (eventData: {
    name: string;
    state: number;
    date: string;
    location: string;
    policy: string | Text;
    description: string;
    bannerEvent: string;
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
        Access : 123
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:3003/admin/event',
        eventData,
        config
      );
      
    } catch (error) {
      console.error(error);
    }
  };
}

export default EventController;
