import React from "react";
import styled from "@emotion/styled";

const ModalBackground = styled.section`
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  background: #03030360;
  justify-content: center;
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
`;

const Modal = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  top: 50%;
  left: 25%;
  margin: auto;
`;

const ModalComponent = ({ handleClose }) => {
  const [author, setAuthor] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [deepThought, setDeepThought] = React.useState("");
  return (
    <ModalBackground>
      <Modal>
        <button onClick={handleClose}>OH MY GOD</button>
      </Modal>
    </ModalBackground>
  );
};

export default ModalComponent;
