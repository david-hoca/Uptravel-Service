import axios from "./api";

const token = localStorage.getItem("token");

const TravelService = {
  //* GET | REQUEST
  getTravels: async () => {
    try {
      const data = await axios.get(`travel/getAll`, {
        headers: {
          token,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default TravelService;
