import funcs from "./blogService";
import { passwordCreator } from "./passwordReducer";
import { usernameCreator } from "./usernameReducer";
const storedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
const storedUserCred = JSON.parse(
  window.localStorage.getItem("loggedUserCred")
);

export const loginCreator = (baseUrl, username, password) => {
  return async (dispatch) => {
    //console.log(JSON.stringify({username, password}))
    let loggedInUser, config;
    try {
      loggedInUser = await funcs.login(baseUrl, { username, password });
      config = {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      };
      //user object contains user's username and id fields
      //const loggedInUser = jsonwebtoken.verify(userToken.data, 'asdjdlsdofwpmdlf')
      //setLUtoken(loggedInUser.data.token)
      //console.log(loggedInUser)
      //console.log(JSON.stringify(config));
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedInUser));
      window.localStorage.setItem("loggedUserCred", JSON.stringify(config));

      dispatch({
        type: "LOG_IN",
        payload: { storedUser: loggedInUser, storedUserCred: config },
      });

      //console.log(userToken.data)
    } catch (error) {
      console.log(error.response.data);
    }

    dispatch(usernameCreator(""));
    dispatch(passwordCreator(""));

    //console.log(JSON.stringify(loggedInUser))
  };
};

export const logoutCreator = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    window.localStorage.removeItem("loggedUserCred");
    dispatch({
      type: "LOG_OUT",
      payload: { storedUser: null, storedUserCred: null },
    });
  };
};

const loggedUserReducer = (
  state = storedUser
    ? { storedUser, storedUserCred }
    : { storedUser: null, storedUserCred: null },
  action
) => {
  switch (action.type) {
    case "LOG_IN":
      return action.payload;
    case "LOG_OUT":
      return action.payload;
    default:
      return state;
  }
};

export default loggedUserReducer;
