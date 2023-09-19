import axios from "./api";

const token = localStorage?.getItem("token");
const userData = JSON.parse(localStorage?.getItem("userData"));
const id = userData?._id;

const PostService = {
  //* POSTS | REQUEST
  postContent: async (body) => {
    try {
      const data = await axios.post(`posts`, body, {
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

  //* GET | REQUEST
  getMyContent: async (body) => {
    try {
      const data = await axios.get(`posts`, body, {
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

  //* GET | REQUEST
  getAllContent: async () => {
    try {
      const data = await axios.get(`posts/getAll`, {
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

  //* DELETE | REQUEST
  deleteMyContent: async () => {
    try {
      const data = await axios.delete(`posts/${id}`, {
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

export default PostService;
