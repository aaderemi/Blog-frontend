export const usernameCreator = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "CHANGE_NAME",
      payload,
    });
  };
};
const usernameReducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return action.payload;

    default:
      return state;
  }
};

export default usernameReducer;
