import React from "react";
import styled from "@emotion/styled";

import { FaTimes } from "react-icons/fa"; // Font Awesome

const WidthFix = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
  width: 100%;
`;

const Wrapper = styled.div`
  margin-right: 1rem;
  :hover {
    cursor: pointer;
  }
`;

const CloseButton = ({ onClick }) => (
  <WidthFix>
    <Wrapper onClick={onClick}>
      <FaTimes />
    </Wrapper>
  </WidthFix>
);

export default CloseButton;
