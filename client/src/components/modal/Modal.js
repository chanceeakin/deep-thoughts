import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import Title from "./Title";
import Button from "./Button";
import IconButton from "./IconButton";

const inputBackground = `rgba(57, 63, 84, 0.8)`;
const textInactive = `#7881A1`;
const textActive = `#BFD2FF`;

const gradient = keyframes`
  0%{background-position:0 0}
  100%{background-position:100% 0}
  `;

const Modal = styled.div`
  width: 50%;
  overflow-y: scroll;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  top: 50%;
  left: 25%;
  margin: auto;
  color: black;
  z-index: 1000;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
  width: 100%;
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  width: 100%;
`;

const Label = styled.label`
  padding: 1rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 2px;
  padding: 0.5rem 1rem;
  background: ${inputBackground};
  &:after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    height: 2px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-position: 0% 0%;
    background: linear-gradient(
      to right,
      #b294ff,
      #57e6e6,
      #feffb8,
      #57e6e6,
      #b294ff,
      #57e6e6
    );
    background-size: 500% auto;
    animation: ${gradient} 3s linear infinite;
  }
`;

const Input = styled.input`
  border-style: none;
  background: transparent;
  outline: none;
  flex-grow: 1;
  color: ${textActive};
  font-size: 1rem;
  line-height: 1.333rem;
  vertical-align: middle;
  &::-placeholder {
    color: ${textInactive};
  }
`;

const TextArea = styled.textarea`
  border-style: none;
  background: transparent;
  outline: none;
  flex-grow: 1;
  color: ${textActive};
  font-size: 1rem;
  line-height: 1.333rem;
  vertical-align: middle;
  &::-placeholder {
    color: ${textInactive};
  }
`;

const ModalComponent = ({
  handleClose,
  handleTitleChange,
  handleSubmit,
  handleDeepThoughtChange,
  handleAuthorChange,
  title,
  deepThought,
  author,
  type,
  handleDelete
}) => {
  const [isDeleting, setDelete] = React.useState(false);
  return (
    <Modal>
      <ButtonContainer>
        {type === "edit" ? (
          <IconButton
            type="delete"
            onClick={() => setDelete(state => !state)}
          />
        ) : null}
        <IconButton type="close" onClick={handleClose} />
      </ButtonContainer>
      {type === "edit" && isDeleting ? (
        <DeleteButtonContainer>
          <Button
            type="delete"
            title="Delete"
            onClick={() => {
              setDelete(state => !state);
              handleDelete();
            }}
          />
          <Button
            type="dark"
            title="Cancel"
            onClick={() => setDelete(state => !state)}
          />
        </DeleteButtonContainer>
      ) : (
        <>
          <Title type={type} />
          <Label for="title">Title</Label>
          <InputWrapper>
            <Input
              onChange={handleTitleChange}
              name="title"
              placeholder="Title"
              value={title}
            />
          </InputWrapper>
          <Label for="deep_thought">Deep Thought</Label>
          <InputWrapper>
            <TextArea
              onChange={handleDeepThoughtChange}
              value={deepThought}
              name="deep_thought"
              rows="2"
              placeholder="Deep Thought"
            />
          </InputWrapper>
          <Label for="author">Author</Label>
          <InputWrapper>
            <Input
              onChange={handleAuthorChange}
              placeholder="Author"
              name="authro"
              value={author}
            />
          </InputWrapper>
          <Button onClick={handleSubmit} title="Submit" type="dark" />
        </>
      )}
    </Modal>
  );
};

export default ModalComponent;
