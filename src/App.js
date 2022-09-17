//import jsonwebtoken from 'jsonwebtoken'
import { useEffect, useState } from "react";
import Togglable from "./Togglable";
import CreatePost from "./CreatePost";
import ShowBlog from "./ShowBlog";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { usernameCreator } from "./usernameReducer";
import { passwordCreator } from "./passwordReducer";
import { loginCreator, logoutCreator } from "./loggedUserReducer";
import { blogListCreator } from "./blogReducer";
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  Navigate,
} from "react-router-dom";
import Users from "./Users";
import UserBlogs from "./UserBlogs";
import Blog from "./Blog";
import styled from "styled-components";

const baseUrl = "/api";

const StyledDiv = styled.div`
  background-color: #e5e5e5;
  margin: 1em;
  margin-top: 0em;
  font-family: "Trebuchet-MS";
  min-height: 90vh;
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    h2 {
      font-family: "Lexend Deca";
      color: #224957;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
        0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    input {
      margin: 10px;
      background-color: #224957;
      border-radius: 10px;
      color: #ffffff;
      ::placeholder {
        color: white;
        font-size: 10px;
      }
      width: 15em;
    }
    button {
      border-radius: 10px;
      background-color: #20df7f;
      width: 15em;
    }
  }
`;

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .blog-nav {
    margin-right: auto;
    text-decoration: none;
    h1 {
      color: #8186a0;
    }
  }
  .users-nav {
    text-decoration: none;
    color: #8186a0;
  }
  button {
    margin: 10px;
    color: #8186a0;
  }
`;

const App = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);
  const password = useSelector((state) => state.password);
  const user = useSelector((state) => state.user.storedUser);
  const blogList = useSelector((state) => state.blogList);
  let config = useSelector((state) => state.user.storedUserCred);
  //const [blogList, setBlogList] = useState([]);
  const [showCreateNew, setShowCreateNew] = useState(false);

  const handleDoLogin = async (e) => {
    e.preventDefault();
    dispatch(loginCreator(baseUrl, username, password));
  };

  const changeUsername = (e) => {
    dispatch(usernameCreator(e.target.value));
  };

  const changePassword = (e) => {
    dispatch(passwordCreator(e.target.value));
  };

  const doLogout = () => {
    dispatch(logoutCreator());
  };

  const handleCreateFieldsChange = (e, setState) => {
    setState(e.target.value);
  };

  const showLogin = () => {
    return (
      <form onSubmit={handleDoLogin}>
        <div className="login-form">
          <h2>Log in to App</h2>
          <div>
            <input
              type="text"
              onChange={changeUsername}
              value={username}
              placeholder={"Username"}
            ></input>
          </div>
          <div>
            <input
              type="password"
              onChange={changePassword}
              value={password}
              placeholder={"Password"}
            ></input>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </div>
      </form>
    );
  };

  const showBlogs = () => {
    return (
      <StyledHome>
        <h2>{user.username.toUpperCase()} is logged in </h2>
        <h3>Blogs</h3>
        {[...blogList]
          .sort((blog1, blog2) => {
            //console.log(blog1)
            return blog2.likes - blog1.likes;
          })
          .map((blog) => {
            return (
              <ShowBlog
                key={blog.id}
                blog={blog}
                user={user}
                blogs={blogList}
                config={config}
              />
            );
          })}

        <Togglable
          state={showCreateNew}
          buttonLabel="Show Create New"
          setState={setShowCreateNew}
        >
          <CreatePost
            user={user}
            baseUrl={baseUrl}
            blogList={blogList}
            setShowCreateNew={setShowCreateNew}
            handleCreateFieldsChange={handleCreateFieldsChange}
            config={config}
          />
        </Togglable>
      </StyledHome>
    );
  };

  useEffect(() => {
    if (user) {
      //console.log(config, "app");
      dispatch(blogListCreator(baseUrl, config));
    }
  }, [user, dispatch]);

  return (
    <Router>
      <StyledDiv>
        <StyledNav>
          <Link to={"/"} className="blog-nav">
            <h1>Blog</h1>
          </Link>
          {user ? (
            <div>
              <Link
                to={"/users"}
                style={{ display: "inline" }}
                className="users-nav"
              >
                Users
              </Link>
              <button onClick={doLogout}>Logout</button>
            </div>
          ) : null}
        </StyledNav>
        <Routes>
          <Route exact path="/" element={user ? showBlogs() : showLogin()} />
          <Route
            path="/users"
            element={
              user ? (
                <Users baseUrl={baseUrl} config={config} />
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="/users/:user"
            element={user ? <UserBlogs /> : <Navigate replace to={"/"} />}
          />
          <Route
            path="/blogs/:blog"
            element={user ? <Blog /> : <Navigate replace to={"/"} />}
          />
        </Routes>
      </StyledDiv>{" "}
    </Router>
  );
};

export default App;
