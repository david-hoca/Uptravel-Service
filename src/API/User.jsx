import axios from "./api";

const token = localStorage.getItem("token");

const UserService = {
  //* PROFILE | POST REQUEST
  getProfile: async () => {
    try {
      const data = await axios.get(`user`, {
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

  putProfile: async (body) => {
    try {
      const data = await axios.put(`user`, body, {
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

export default UserService;
