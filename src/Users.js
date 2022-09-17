import { useEffect } from "react";
import { getAllBlogs } from "./allBlogsRed";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
//import { useState } from "react";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    align-self: flex-start;
  }
  table {
    table-layout: fixed;
    width: 50%;
    th,
    td {
      padding: 20px;
    }
    border-collapse: collapse;
    color: black;
  }
  .nav {
    text-decoration: none;
    color: #8186a0;
  }
  td {
    text-align: center;
    color: white;
  }
  tbody tr:nth-child(odd) {
    background-color: #011318;
  }
  tbody tr:nth-child(even) {
    background-color: #180601;
  }
`;

const Users = (props) => {
  const dispatch = useDispatch();
  let blogposts = useSelector((state) => state.allBlogs);
  //const [userBlogs, setUserBlogs] = useState({});
  let userBlogsD = {};

  useEffect(() => {
    dispatch(getAllBlogs(props));
  }, []);

  if (blogposts.length != 0) {
    for (let blog of blogposts) {
      if (blog.owner.username in userBlogsD) {
        userBlogsD[blog.owner.username] =
          userBlogsD[blog.owner.username].concat(blog);
      } else {
        userBlogsD[blog.owner.username] = [blog];
      }
    }
  }

  const showTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(userBlogsD).map((user) => {
            return (
              <tr key={user}>
                <th>
                  <Link
                    to={{
                      pathname: `/users/${userBlogsD[user][0].owner.id}`,
                    }}
                    state={blogposts.filter((blog) => {
                      return blog.owner.username === user;
                    })}
                    className="nav"
                  >
                    {user}
                  </Link>
                </th>
                <td>{userBlogsD[user].length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  return (
    <StyledDiv>
      <h3>Users</h3>
      {blogposts.length === 0 ? null : showTable()}
    </StyledDiv>
  );
};

export default Users;
