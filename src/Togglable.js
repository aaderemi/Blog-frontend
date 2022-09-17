import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 10px;
  background-color: #20df7f;
  width: 10em;
  display: inline;
`;

const Togglable = (props) => {
  const toggleButton = { display: props.state ? "none" : "" };
  const showContent = { display: props.state ? "" : "none" };
  return (
    <div>
      <StyledButton
        onClick={() => {
          props.setState(true);
        }}
        style={toggleButton}
      >
        {props.buttonLabel}
      </StyledButton>
      <div style={showContent}>
        {props.children}
        <div>
          <StyledButton
            onClick={() => {
              props.setState(false);
            }}
          >
            Cancel
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default Togglable;
