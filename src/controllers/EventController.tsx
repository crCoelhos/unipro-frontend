import axios from "axios";

interface EventData {
  name: string;
  state: number;
  date: string;
  location: string;
  description: string;
}

const EventController = {
  createEvent: async (eventData: EventData) => {
    try {
      const response = await axios.post(
        "http://localhost:3003/admin/event",
        eventData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log(response.data);
    } catch (error) {
      throw error;
    }
  }
};

export default EventController;
