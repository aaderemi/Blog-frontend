import funcs from "./blogService";
export const blogListCreator = (baseUrl, config) => {
  return async (dispatch) => {
    const response = await funcs.getUserBlogs(baseUrl, config);
    dispatch({
      type: "FETCH_BLOGS",
      payload: response.blogs,
    });
  };
};

export const newPostCreator = (data, baseUrl, config) => {
  return async (dispatch) => {
    const result = await funcs.createPost(baseUrl, data, config);
    dispatch({
      type: "NEW_POST",
      payload: result,
    });
  };
};
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_BLOGS":
      return action.payload;
    case "DEL_POST":
      return state.filter((blog) => blog.id !== action.payload);
    case "NEW_POST":
      return state.concat(action.payload);
    default:
      return state;
  }
};

export default blogReducer;
