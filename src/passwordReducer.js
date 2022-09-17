export const passwordCreator = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "CHANGE_PASSWORD",
      payload,
    });
  };
};
const passwordReducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_PASSWORD":
      return action.payload;

    default:
      return state;
  }
};

export default passwordReducer;
