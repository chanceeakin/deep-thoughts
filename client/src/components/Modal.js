import React from "react";
import PropTypes from "prop-types";
import { useTransition, animated as a } from "react-spring";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

const gradient = keyframes`
  0%{background-position:0 0}
  100%{background-position:100% 0}
  `;

const inputBackground = `rgba(57, 63, 84, 0.8)`;
const textInactive = `#7881A1`;
const textActive = `#BFD2FF`;

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
`;

const Modal = styled.div`
  width: 50%;
  height: 50%;
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
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 2px;
  padding: 1.4rem 2rem 1.6rem;
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
  font-size: 1.8rem;
  line-height: 2.4rem;
  vertical-align: middle;
  &::-webkit-input-placeholder {
    color: ${textInactive};
  }
`;

const TYPES = {
  UPDATE_TITLE: "UPDATE_TITLE",
  UPDATE_ID: "UPDATE_ID",
  UPDATE_DEEP_THOUGHT: "UPDATE_DEEP_THOUGHT",
  UPDATE_AUTHOR: "UPDATE_AUTHOR",
  UPDATE_CREATED_AT: "UPDATE_CREATED_AT",
  UPDATE_ALL: "UPDATE_ALL"
};

const initialState = ({ deep_thought, author, title, id, created_at }) => ({
  deep_thought,
  author,
  title,
  id,
  created_at
});

function reducer(state, action) {
  switch (action.type) {
    case TYPES.UPDATE_TITLE:
      return {
        ...state,
        title: action.data
      };
    case TYPES.UPDATE_DEEP_THOUGHT:
      return {
        ...state,
        deep_thought: action.data
      };
    case TYPES.UPDATE_AUTHOR:
      return {
        ...state,
        author: action.data
      };
    case TYPES.UPDATE_ALL:
      const { id, author, title, created_at, deep_thought } = action.data;
      return {
        ...state,
        id,
        author,
        title,
        created_at,
        deep_thought
      };
    default:
      throw new Error();
  }
}

const ModalComponent = ({ deepThought }) => {
  const [isOpen, set] = React.useState(false);
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState(deepThought)
  );

  const transitions = useTransition(isOpen, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  React.useEffect(() => {
    dispatch({
      type: TYPES.UPDATE_ALL,
      data: initialState(deepThought)
    });
  }, [deepThought]);

  const handleOpen = () => {
    set(true);
  };

  const handleClose = () => {
    set(false);
  };
  console.log(state);
  return (
    <>
      <Button onClick={handleOpen}>Edit me!</Button>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <ModalBackground key={key} style={props}>
              <Modal>
                <button onClick={handleClose}>OH MY GOD</button>
                <InputWrapper>
                  <Input
                    onChange={({ target }) => {
                      dispatch({
                        type: TYPES.UPDATE_TITLE,
                        data: target.value
                      });
                    }}
                    value={state.title}
                  />
                </InputWrapper>
                <textarea
                  onChange={({ target }) => {
                    dispatch({
                      type: TYPES.UPDATE_DEEP_THOUGHT,
                      data: target.value
                    });
                  }}
                  value={state.deep_thought}
                />
                <InputWrapper>
                  <Input
                    onChange={({ target }) => {
                      dispatch({
                        type: TYPES.UPDATE_AUTHOR,
                        data: target.value
                      });
                    }}
                    value={state.author}
                  />
                </InputWrapper>
              </Modal>
            </ModalBackground>
          )
      )}
    </>
  );
};

ModalComponent.propTypes = {
  deepThought: PropTypes.object.isRequired
};

export default ModalComponent;
