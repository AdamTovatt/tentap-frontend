import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import { useEffect, useState } from "react";
import Character from "./Character.js";

const TamapluggiScreen = () => {
  return (
    <TamapluggiScreenBackground>
      <Character />
    </TamapluggiScreenBackground>
  );
};

const TamapluggiScreenBackground = styled.div`
  width: 60vw;
  height: 50vh;
  max-width: 40rem;
  max-height: 30rem;
  background-color: ${Color.White};
  border-radius: ${BorderRadius.Default};
`;

export default TamapluggiScreen;
