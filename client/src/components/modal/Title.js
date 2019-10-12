import React from "react";
import styled from "@emotion/styled";

const Styled = styled.h3``;

const Title = ({ type }) => {
  switch (type) {
    case "add":
      return <Styled>Add a Deep Thought</Styled>;
    case "edit":
      return <Styled>Edit Deep Thought</Styled>;
    default:
      return null;
  }
};

export default Title;
