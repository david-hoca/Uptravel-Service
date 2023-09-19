import axios from "./api";

const token = localStorage?.getItem("token");

const JobService = {
  //* GET | REQUEST
  getAllJobs: async () => {
    try {
      const data = await axios.get(`job/getAll`, {
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

export default JobService;
