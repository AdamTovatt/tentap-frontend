import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import NumericInput from "../NumericInput";
import ThinButton from "../ThinButton";

const SettingsScreen = () => {
  return (
    <Background>
      <NumericInput
        title={"Antal pluggtimmar:"}
        color={Color.White}
        placeHolder={"180 minuter"}
      ></NumericInput>
      <CloseButton></CloseButton>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  background-color: ${Color.Blue};
  border-radius: ${BorderRadius.Default};
  position: absolute;
  padding: 2rem;
`;

const CloseButton = styled.div`
  min-width: 2rem;
  min-height: 2rem;
  position: absolute;
  right: -0.5rem;
  top: -0.5rem;
  background-color: ${Color.Red};
  border-radius: ${BorderRadius.Default};
`;

export default SettingsScreen;
