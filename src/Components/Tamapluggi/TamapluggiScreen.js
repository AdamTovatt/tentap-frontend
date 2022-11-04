import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Character from "./Character.js";
import { randomNumberInRange } from "../../Functions";

const TamapluggiScreen = () => {
  const characterBox = useRef(null);
  const [width, setWidth] = useState(null);

  useLayoutEffect(() => {
    setWidth(characterBox.current.offsetWidth);
  }, []);

  return (
    <TamapluggiScreenBackground ref={characterBox}>
      <Character character={1} containerWidth={width} />
    </TamapluggiScreenBackground>
  );
};

const TamapluggiScreenBackground = styled.div`
  @media (min-width: 1000px) {
    width: 60vw;
  }
  width: 100vw;
  height: 50vh;
  max-width: 40rem;
  max-height: 30rem;
  //background-color: ${Color.White};
  border-radius: ${BorderRadius.Default};
`;

export default TamapluggiScreen;
