import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 90%;
  .profile {
    grid-column: 1;
    grid-row: 1;
  }
  .content {
    grid-column: 2;
    grid-row: 1;
    border-left: 1px solid #999;
    padding: 30px;
  }
`;
const UserBlogs = () => {
  const loc = useLocation();
  return (
    <StyledDiv>
      <div className="profile">
        <h2>About Author: {loc.state[0].author}</h2>
        <p>
          Nam vulputate diam nec tempor bibendum. Donec luctus augue eget
          malesuada ultrices. Phasellus turpis est, posuere sit amet dapibus ut,
          facilisis sed est.
        </p>
      </div>
      <div className="content">
        <h3>Blogs added</h3>
        <ul>
          {loc.state.map((blog) => {
            return (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`} state={blog} className="nav">
                  {blog.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </StyledDiv>
  );
};

export default UserBlogs;
