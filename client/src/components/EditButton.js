import React from "react";
import styled from "@emotion/styled";
import Modal from "./Modal";

const Button = styled.div`
  position: absolute;
  left: 90%;
  top: 90%;
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem;
  margin: 0.5rem 1rem;
  background: transparent;
  color: #fafafa;
  border: 2px solid #fafafa;
  cursor: pointer;
  :hover {
    background: #fafafa;
    color: #030303;
  }
`;

const EditButton = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Button onClick={handleOpen}>Edit me!</Button>
      {isModalOpen ? <Modal handleClose={handleClose} /> : null}
    </>
  );
};

export default EditButton;
