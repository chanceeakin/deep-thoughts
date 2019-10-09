import React from "react";

import { css, keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import Card from "./Card";
import Modal from "./Modal";
import { getRandomThought } from "../api/deepThoughts";

const gradient = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
`;

const rootStyles = css`
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: ${gradient} 15s ease infinite;
  -moz-animation: ${gradient} 15s ease infinite;
  animation: ${gradient} 15s ease infinite;
`;

const Root = styled.div`
  ${rootStyles}
`;

const Header = styled.header`
  /* background-color: #282c34; */
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.h1`
  color: #030303;
  font-size: 4rem;
`;

async function getData(setDeepThought) {
  try {
    const thought = await getRandomThought();
    setDeepThought(thought);
  } catch (e) {
    throw e;
  }
}

const Container = () => {
  const [deepThought, setDeepThought] = React.useState({});
  React.useEffect(() => {
    getData(setDeepThought);
  }, []);

  return (
    <Root>
      <Header>
        <Title>Deep Thoughts</Title>
        <Card
          onClick={() => getData(setDeepThought)}
          deepThought={deepThought}
        />
      </Header>
      <Modal deepThought={deepThought} />
    </Root>
  );
};

export default Container;
