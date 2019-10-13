import React from "react";
import styled from "@emotion/styled";

import { FaTimes, FaTrash } from "react-icons/fa"; // Font Awesome

const Wrapper = styled.div`
  margin-right: 1rem;
  :hover {
    cursor: pointer;
  }
`;

const WrappedDelete = styled(FaTrash)`
  color: ${({ type }) => (type === "delete" ? "#e73c7e" : "#030303")};
`;

const CloseButton = ({ onClick, type }) => (
  <Wrapper onClick={onClick}>
    {type === "close" ? <FaTimes /> : null}
    {type === "delete" ? <WrappedDelete type={type} /> : null}
  </Wrapper>
);

export default CloseButton;
