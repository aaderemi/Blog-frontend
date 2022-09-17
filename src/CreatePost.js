import React from "react";
import { useState } from "react";
import { newPostCreator } from "./blogReducer";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const StyledInput = styled.input`
  border: 0.5px none grey;
  border-bottom-style: solid;
  margin-bottom: 0.5em;
  width: 25em;
  height: 3em;
`;

const StyledButton = styled.button`
  border-radius: 10px;
  background-color: #20df7f;
  width: 10em;
  display: inline;
`;

const CreatePost = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      url,
    };
    dispatch(newPostCreator(data, props.baseUrl, props.config));
    setTitle("");
    setAuthor("");
    setUrl("");
    props.setShowCreateNew(false);
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleCreatePost}>
        <div>
          <StyledInput
            value={title}
            onChange={(e) => {
              props.handleCreateFieldsChange(e, setTitle);
            }}
            placeholder="Title"
          ></StyledInput>
        </div>
        <div>
          <StyledInput
            value={author}
            onChange={(e) => {
              props.handleCreateFieldsChange(e, setAuthor);
            }}
            placeholder="Author"
          ></StyledInput>
        </div>
        <div>
          <StyledInput
            value={url}
            onChange={(e) => {
              props.handleCreateFieldsChange(e, setUrl);
            }}
            placeholder="Url"
          ></StyledInput>
        </div>
        <div>
          <StyledButton className="createPost">Create</StyledButton>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
