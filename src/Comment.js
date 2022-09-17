import { useDispatch } from "react-redux";
import { useState } from "react";
import { commentCreator } from "./allBlogsRed";
import styled from "styled-components";

const StyledInput = styled.input`
  border: 0.5px none grey;
  border-bottom-style: solid;
  margin-bottom: 0.5em;
  width: 25em;
  height: 3em;
  background-color: #e5e5e5;
`;

const Comment = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    const comm = {
      comment: text,
    };
    dispatch(commentCreator(props.blog, comm, props.config));
    setText("");
  };
  return (
    <div>
      <form onSubmit={handleClick}>
        <StyledInput
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        ></StyledInput>
        <button>add comment</button>
      </form>
    </div>
  );
};

export default Comment;
