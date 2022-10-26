import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { randomNumberInRange } from "../Functions";
import { BorderRadius, Color } from "./Constants";
import ThinButton from "./ThinButton";

const DialogBox = ({ text, setDialogText }) => {
  const okButtonsText = ["okejdå", "aja, okej", "okej", "jaha, ok"];

  return (
    <FadedScreen
      onClick={() => {
        setDialogText(null);
      }}
    >
      <DialogBackground>
        <TextContainer>{text}</TextContainer>
        <ButtonsContainer>
          <ThinButton
            Width={"10rem"}
            Color={Color.Green}
            TextColor={Color.Dark}
          >
            {okButtonsText[randomNumberInRange(0, okButtonsText.length - 1)]}
          </ThinButton>
        </ButtonsContainer>
      </DialogBackground>
    </FadedScreen>
  );
};

const rotate = keyframes`
  0%
  {
    transform: scale( 1, 0.1 );
  }
  60%
  {
    transform: scale( 1, 1.1 );
  }
  95%
  {
    transform: scale(1, 0.98);
  }
  100%
  {
    transform: scale(1, 1);
  }
`;

const TextContainer = styled.div`
  margin: 2rem;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
`;

const DialogBackground = styled.div`
  background-color: ${Color.Blue};
  border-radius: ${BorderRadius.Default};
  min-width: 5rem;
  min-height: 5rem;
  max-width: 90vw;
  position: fixed;
  animation: ${rotate} 0.2s ease forwards;
`;

const FadedScreen = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgb(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DialogBox;
