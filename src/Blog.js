import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { likeBlogCreator, deleteBlogCreator } from "./allBlogsRed";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 90%;
  .content {
    grid-column: 1;
    grid-row: 1;
  }
  .comment {
    grid-column: 2;
    grid-row: 1;
    border-left: 1px solid #999;
    padding: 30px;
  }
  button {
    margin: 5px;
    background-color: #20df7f;
    border-radius: 10px;
  }
`;

const Blog = () => {
  const loc = useLocation();
  const nav = useNavigate();
  //console.log(loc.state);
  const blogInUse = useSelector((state) => {
    //console.log("here", state.allBlogs);
    return state.allBlogs.find((blog) => blog.id === loc.state.id);
  });
  const dispatch = useDispatch();
  const config = useSelector((state) => state.user.storedUserCred);
  const loggedInUser = useSelector((state) => state.user.storedUser);
  //console.log(blogInUse.owner.id, loggedInUser);
  const handleLike = (blog) => {
    //console.log(blog);
    dispatch(likeBlogCreator(blog, config));
  };
  const handleDelete = async () => {
    console.log("hi");
    const res = await dispatch(deleteBlogCreator(blogInUse, config));
    if (res) {
      nav("/users");
    }
  };
  return (
    <div>
      {blogInUse ? (
        <StyledDiv>
          <div className="content">
            <h1>{blogInUse.title}</h1>
            <p>
              Duis felis orci, pulvinar id metus ut, rutrum luctus orci. Cras
              porttitor imperdiet nunc, at ultricies tellus laoreet sit amet.
              Sed auctor cursus massa at porta. Integer ligula ipsum, tristique
              sit amet orci vel, viverra egestas ligula. Curabitur vehicula
              tellus neque, ac ornare ex malesuada et. In vitae convallis lacus.
              Aliquam erat volutpat. Suspendisse ac imperdiet turpis. Aenean
              finibus sollicitudin eros pharetra congue. Duis ornare egestas
              augue ut luctus. Proin blandit quam nec lacus varius commodo et a
              urna. Ut id ornare felis, eget fermentum sapien.
            </p>
            <p>
              Nam vulputate diam nec tempor bibendum. Donec luctus augue eget
              malesuada ultrices. Phasellus turpis est, posuere sit amet dapibus
              ut, facilisis sed est. Nam id risus quis ante semper consectetur
              eget aliquam lorem. Vivamus tristique elit dolor, sed pretium
              metus suscipit vel. Mauris ultricies lectus sed lobortis finibus.
              Vivamus eu urna eget velit cursus viverra quis vestibulum sem.
              Aliquam tincidunt eget purus in interdum. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>
            <a href={blogInUse.url}>{loc.state.url}</a>
            <div>
              Likes: {blogInUse.likes}{" "}
              <button
                onClick={() => {
                  handleLike(blogInUse);
                }}
              >
                Like
              </button>
              {blogInUse.owner.username === loggedInUser.username ? (
                <button onClick={handleDelete}>Delete</button>
              ) : null}
            </div>
            <p>added by {blogInUse.author}</p>
          </div>
          <div className="comment">
            <h2>Comments</h2>
            <Comment config={config} blog={blogInUse} />
            <ul>
              {blogInUse.comments.map((comment) => {
                return <li key={comment._id}>{comment.comment}</li>;
              })}
            </ul>
          </div>
        </StyledDiv>
      ) : null}
    </div>
  );
};

export default Blog;
