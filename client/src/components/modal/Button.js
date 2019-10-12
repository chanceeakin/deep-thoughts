import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const rootStyles = ({ type }) => css`
  position: absolute;
  top: 90%;
  border-radius: 4px;
  display: inline - block;
  border-radius: 3px;
  padding: 0.5rem;
  margin: 0.5rem 1rem;
  background: transparent;
  color: ${type === "dark" ? "#030303" : "#fafafa"};
  border: 2px solid #fafafa;
  cursor: pointer;
  : hover {
    background: ${type === "dark" ? "#595959" : "#fafafa"};
    color: ${type === "dark" ? "#fafafa" : "#030303"};
  }
`;

const setSide = ({ type }) => {
  switch (type) {
    case "left":
      return {
        right: "90%"
      };
    case "right":
      return {
        left: "90%"
      };
    case "dark":
      return {
        position: "relative",
        top: null
      };
    default:
      return null;
  }
};

const Button = styled.div(props => rootStyles(props), setSide);

const ModalButton = ({ onClick, title, type }) => {
  return (
    <Button type={type} onClick={onClick}>
      {title}
    </Button>
  );
};

export default ModalButton;
