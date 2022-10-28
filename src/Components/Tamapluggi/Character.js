import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import { useEffect, useState } from "react";

const Character = ({ character }) => {
  const imagePath = getCharacterGraphicFromNumber(character ? character : 1);
  const [counter, setCounter] = useState(0);
  const [xPosition, setXPositon] = useState(-30);
  const [facingRight, setFacingRight] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 1);
      calculateXPosition(
        xPosition,
        setXPositon,
        facingRight,
        setFacingRight,
        counter
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
  counter
) {
  if (xPosition <= -30) {
    setFacingRight(true);
  } else if (xPosition >= 30) {
    setFacingRight(false);
  }

  let xIncrease = 5;

  if (counter % 2 === 0) xIncrease = 2;

  setXPositon(xPosition + (facingRight ? xIncrease : -1 * xIncrease));
}

function getCharacterGraphicFromNumber(number) {
  if (number === 1) return "/tamaPluggi/pluggiCharacter_01.svg";
}

const Text = styled.div`
  color: ${Color.Dark};
`;

const CharacterImage = styled.img`
  height: 40%;
  object-fit: contain;
  position: relative;
  top: ${(props) =>
    props.squashed
      ? (10 - 0.5).toString() + "rem"
      : (10 - 0).toString() + "rem"};
  left: ${(props) => props.xPosition + "%"};
  transform: scale(
    ${(props) => (props.facingRight ? -1 : 1)},
    ${(props) => (props.squashed ? 1.1 : 1)}
  );
`;

export default Character;
