import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import { useEffect, useState } from "react";
import { ReactComponent as Character2 } from "./Assets/pluggiCharacter_02.svg";

const Character = ({ character, containerWidth }) => {
  const imagePath = getCharacterGraphicFromNumber(character ? character : 1);
  const [counter, setCounter] = useState(0);
  const [xPosition, setXPositon] = useState(5);
  const [facingRight, setFacingRight] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 1);
      calculateXPosition(
        xPosition,
        setXPositon,
        facingRight,
        setFacingRight,
        counter,
        containerWidth
      );
    }, 900);
    return () => {
      clearInterval(interval);
    };
  }, [counter, xPosition, facingRight]);

  return (
    <>
      <CharacterImage
        squashed={counter % 2 === 0}
        xPosition={xPosition}
        facingRight={facingRight}
        src={imagePath}
      ></CharacterImage>
    </>
  );
};

function calculateXPosition(
  xPosition,
  setXPositon,
  facingRight,
  setFacingRight,
  counter,
  containerWidth
) {
  if (xPosition <= 0) {
    setFacingRight(true);
  } else if (xPosition >= containerWidth - 186) {
    setFacingRight(false);
  }

  let xIncrease = 28;

  if (counter % 2 === 0) xIncrease = 5;

  setXPositon(xPosition + (facingRight ? xIncrease : -1 * xIncrease));
}

function getCharacterGraphicFromNumber(number) {
  if (number === 1) return "/tamaPluggi/pluggiCharacter_01.svg";
  if (number === 2) return "/tamaPluggi/pluggiCharacter_02.svg";
}

const Text = styled.div`
  color: ${Color.Dark};
`;

const CharacterImageContainer = styled.div`
  height: 40%;
  max-height: 1rem;
  object-fit: contain;
  position: relative;
  top: ${(props) =>
    props.squashed
      ? (10 - 0.5).toString() + "rem"
      : (10 - 0).toString() + "rem"};
  left: ${(props) => props.xPosition + "px"};
  transform: scale(
    ${(props) => (props.facingRight ? -1 : 1)},
    ${(props) => (props.squashed ? 1.1 : 1)}
  );
`;

const CharacterImage = styled.img`
  height: 40%;
  object-fit: contain;
  position: relative;
  top: ${(props) =>
    props.squashed
      ? (10 - 0.5).toString() + "rem"
      : (10 - 0).toString() + "rem"};
  left: ${(props) => props.xPosition + "px"};
  transform: scale(
    ${(props) => (props.facingRight ? -1 : 1)},
    ${(props) => (props.squashed ? 1.1 : 1)}
  );
`;

export default Character;
