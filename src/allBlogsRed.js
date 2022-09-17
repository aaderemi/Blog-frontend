import funcs from "./blogService";
export const getAllBlogs = (props) => {
  return async (dispatch) => {
    const response = await funcs.getAllBlogs(
      `${props.baseUrl}/blogs`,
      props.config
    );
    dispatch({
      type: "ALL_BLOGS",
      payload: response,
    });
  };
};
export const likeBlogCreator = (blog, config) => {
  return async (dispatch) => {
    const blogId = blog.id;
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const url = `/api/blogs/${blogId}`;
    await funcs.likePost(url, newBlog, config);
    dispatch({
      type: "LIKE_BLOG",
      payload: newBlog,
    });
  };
};
export const deleteBlogCreator = (blog, config) => {
  return async (dispatch) => {
    const deleted = window.confirm("Do you want to delete this post?");
    try {
      if (deleted) {
        console.log("hi");
        const url = `/api/blogs/${blog.id}`;
        dispatch({
          type: "DEL_POST",
          payload: blog.id,
        });
        await funcs.deletePost(url, config);
      }
    } catch (error) {
      console.log(error.response.data);
    }
    if (deleted) {
      return true;
    } else {
      return false;
    }
  };
};
export const commentCreator = (blog, comment, config) => {
  return async (dispatch) => {
    const url = `/api/blogs/${blog.id}/comments`;
    //console.log(comment);
    const newBlog = await funcs.postComment(url, comment, config);
    //console.log(newBlog);
    //console.log(blog);
    dispatch({
      type: "COMMENT",
      payload: newBlog,
    });
  };
};
const allBlogsRed = (state = [], action) => {
  switch (action.type) {
    case "ALL_BLOGS":
      return action.payload;
    case "LIKE_BLOG":
      return state
        .filter((cblog) => cblog.id !== action.payload.id)
        .concat(action.payload)
        .sort((blog1, blog2) => {
          //console.log(blog1)
          return blog2.likes - blog1.likes;
        });
    case "DEL_POST":
      return state.filter((blog) => blog.id !== action.payload);
    case "COMMENT":
      return state
        .filter((blog) => blog.id != action.payload.id)
        .concat(action.payload);
    default:
      return state;
  }
};

export default allBlogsRed;
