import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useSpring, animated as a } from "react-spring";

const Root = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  align-items: center;
  justify-content: center;
`;

const Card = styled(a.div)`
  display: flex;
  position: absolute;
  flex-direction: column;
  text-align: center;
  background: #fafafa;
  padding: 2rem;
  border-radius: 1rem;
  margin: auto;
  width: 50%;
  cursor: pointer;
  will-change: transform, opacity;
`;

const DeepThought = styled.h1`
  color: #030303;
`;

const Author = styled.h3`
  color: #030303;
`;

const CardComponent = ({ deepThought, onClick }) => {
  const [flipped, set] = React.useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  return (
    <Root
      onClick={() => {
        set(state => !state);
        onClick();
      }}
    >
      <Card style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
        <DeepThought>{deepThought && deepThought.deep_thought}</DeepThought>
        <Author> - {deepThought && deepThought.author}</Author>
      </Card>
      <Card
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`)
        }}
      >
        <DeepThought>{deepThought && deepThought.deep_thought}</DeepThought>
        <Author> - {deepThought && deepThought.author}</Author>
      </Card>
    </Root>
  );
};

CardComponent.propTypes = {
  deepThought: PropTypes.shape({
    deep_thought: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default CardComponent;
