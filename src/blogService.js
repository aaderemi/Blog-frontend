import axios from "axios";

const login = async (url, userInfo) => {
  //console.log({...userInfo})
  const result = await axios.post(`${url}/login`, { ...userInfo });
  //console.log(result.data)
  return result.data;
};

const createPost = async (url, data, config) => {
  const result = await axios.post(`${url}/blogs`, data, config);
  return result.data;
};

const getUserBlogs = (url, config) => {
  return axios
    .get(`${url}/users`, config)
    .then((response) => {
      //console.log(response.data)
      //console.log('here')
      //console.log('in blogservice', response.data)
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const getAllBlogs = async (url, config) => {
  const response = await axios.get(url, config);
  return response.data;
};

const likePost = async (url, post, config) => {
  const response = await axios.put(url, post, config);
  return response.data;
};

const deletePost = async (url, config) => {
  const response = await axios.delete(url, config);
  return response;
};

const postComment = async (url, data, config) => {
  const response = await axios.post(url, data, config);
  return response.data;
};
const funcs = {
  login,
  createPost,
  getUserBlogs,
  likePost,
  deletePost,
  getAllBlogs,
  postComment,
};

export default funcs;
