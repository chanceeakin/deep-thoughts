import React from "react";
import styled from "@emotion/styled";
import { animated as a } from "react-spring";

const ModalBackground = styled(a.section)`
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  background: #03030380;
  justify-content: center;
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  z-index: 800;
`;

const ModalBGComponent = ({ children, ...rest }) => (
  <ModalBackground {...rest}>{children}</ModalBackground>
);
export default ModalBGComponent;
