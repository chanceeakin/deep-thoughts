import React from "react";
import PropTypes from "prop-types";
import { useTransition } from "react-spring";
import Modal from "./Modal";
import ModalButton from "./Button";
import ModalBackground from "./ModalBackground";
import { postThought } from "../../api/deepThoughts";

const TYPES = {
  UPDATE_TITLE: "UPDATE_TITLE",
  UPDATE_ID: "UPDATE_ID",
  UPDATE_DEEP_THOUGHT: "UPDATE_DEEP_THOUGHT",
  UPDATE_AUTHOR: "UPDATE_AUTHOR",
  UPDATE_CREATED_AT: "UPDATE_CREATED_AT",
  UPDATE_ALL: "UPDATE_ALL"
};

const initialState = {
  deep_thought: "",
  author: "",
  title: ""
};

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
      const { author, title, deep_thought } = action.data;
      return {
        ...state,
        author,
        title,
        deep_thought
      };
    default:
      throw new Error();
  }
}

const ModalComponent = () => {
  const [isOpen, set] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const transitions = useTransition(isOpen, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const handleOpen = () => {
    set(true);
  };

  const handleClose = () => {
    dispatch({
      type: TYPES.UPDATE_ALL,
      data: {
        author: "",
        title: "",
        deep_thought: ""
      }
    });
    set(false);
  };

  const handleSubmit = async () => {
    try {
      await postThought({
        title: state.title,
        deep_thought: state.deep_thought,
        author: state.author
      });
      handleClose();
    } catch (e) {
      throw e;
    }
  };

  const handleTitleChange = ({ target }) => {
    dispatch({
      type: TYPES.UPDATE_TITLE,
      data: target.value
    });
  };

  const handleAuthorChange = ({ target }) => {
    dispatch({
      type: TYPES.UPDATE_AUTHOR,
      data: target.value
    });
  };

  const handleDeepThoughtChange = ({ target }) => {
    dispatch({
      type: TYPES.UPDATE_DEEP_THOUGHT,
      data: target.value
    });
  };

  return (
    <>
      <ModalButton onClick={handleOpen} title="Add New" type="left" />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <ModalBackground key={key} style={props}>
              <Modal
                handleTitleChange={handleTitleChange}
                handleSubmit={handleSubmit}
                handleClose={handleClose}
                handleAuthorChange={handleAuthorChange}
                handleDeepThoughtChange={handleDeepThoughtChange}
                title={state.title}
                deepThought={state.deep_thought}
                author={state.author}
                type="add"
              />
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
