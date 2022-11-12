import { useState } from "react";
import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import NumericInput from "../NumericInput";
import Spacing from "../Spacing";
import ThinButton from "../ThinButton";

const SettingsScreen = ({ setOpen }) => {
  const [studyTime, setStudyTime] = useState(90);

  return (
    <Background>
      <NumericInput
        title={"Pluggmål per dag:"}
        color={Color.White}
        textValueSuffix={" minuter"}
        changeInterval={30}
        minValue={0}
        startValue={studyTime}
        setState={setStudyTime}
      ></NumericInput>
      <Spacing Height={"1rem"}></Spacing>
      <NumericInput
        title={"Längd på paus:"}
        color={Color.White}
        textValueSuffix={" minuter"}
        changeInterval={30}
        minValue={0}
        startValue={studyTime}
        setState={setStudyTime}
      ></NumericInput>
      <Spacing Height={"1rem"}></Spacing>
      <ThinButton Color={Color.Green} Width={16}>
        Spara
      </ThinButton>
      <CloseButton
        onClick={() => {
          if (setOpen) setOpen(false);
        }}
      >
        X
      </CloseButton>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Color.Blue};
  border-radius: ${BorderRadius.Default};
  position: absolute;
  padding: 2rem;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  min-width: 2.5rem;
  min-height: 2.5rem;
  position: absolute;
  right: -0.5rem;
  top: -0.5rem;
  background-color: ${Color.Red};
  border-radius: ${BorderRadius.Default};
  color: ${Color.Dark};

  cursor: pointer;

  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    transition-duration: 0.05s;
  }
`;

export default SettingsScreen;
