import styled from "styled-components";
import { Color } from "../Constants";
import ThickButton from "../ThickButton.js";
import HorizontalLine from "../HorizontalLine";
import ThinButton from "../ThinButton";
import Spacing from "../Spacing";

const StartPage = () => {
  return (
    <StartPageMainContainer>
      <StartPageHeader>Det borde inte kosta pengar att plugga</StartPageHeader>
      <StartPageSubHeader>
        Öva på tentauppgifter som är sorterade efter svårhetsgrad och kursdel
        gratis
      </StartPageSubHeader>
      <Spacing Height={"2.6rem"} />
      <ThickButton>Gå till kurser</ThickButton>
      <Spacing Height={"4.125rem"} />
      <HorizontalLine />
      <Spacing Height={"1.8rem"} />
      <ThinButton Width={"15.5rem"}>Logga in</ThinButton>
      <Spacing Height={"1rem"} />
      <ThinButton Width={"15.5rem"}>Registrera</ThinButton>
      <Spacing Height={"1.8rem"} />
      <HorizontalLine />
      <Spacing Height={"4.125rem"} />
      <ThinButton Color={Color.Green}>Mer information</ThinButton>
    </StartPageMainContainer>
  );
};

const StartPageHeader = styled.div`
  font-size: 2em;
  color: ${Color.White};
  max-width: 33rem;
  min-height: 4.5rem;
`;

const StartPageSubHeader = styled.div`
  font-size: 1.25em;
  color: ${Color.White};
  max-width: 32rem;
  min-height: 5.5rem;
`;

const StartPageMainContainer = styled.div`
  font-size: 1em;
  font-family: "Jost";
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default StartPage;
