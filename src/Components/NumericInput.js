import { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { BorderRadius, Color } from "./Constants";

const NumericInput = ({
  title,
  placeHolder,
  type,
  setState,
  width,
  color,
  textColor,
  startValue,
  textValueSuffix,
  changeInterval,
  minValue,
  maxValue,
}) => {
  const [numericalValue, setNumericalValue] = useState(
    startValue ? startValue : 120
  );
  const [useTextValue, setUseTextValue] = useState(true);
  const textArea = useRef(null);

  useEffect(() => {}, [useTextValue]);

  return (
    <Container Width={width}>
      <TextAreaTitle>{title}</TextAreaTitle>
      <TextAreaContainer>
        <DecreaseButton
          onClick={() => {
            let newValue =
              numericalValue - (changeInterval ? changeInterval : 1);
            if (minValue == null || newValue >= minValue)
              setNumericalValue(newValue);
          }}
        >
          -
        </DecreaseButton>
        <CustomTextArea
          ref={textArea}
          color={color}
          textColor={textColor}
          width={width}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setUseTextValue(true);
              textArea.current.blur();
            }
          }}
          onChange={(event) => {
            let newValue = parseInt(
              event.target.value ? event.target.value : "0"
            );
            setNumericalValue(newValue);
            if (setState) setState(newValue);
          }}
          type={type}
          placeholder={placeHolder}
          value={
            useTextValue
              ? numericalValue.toString() +
                (textValueSuffix ? textValueSuffix : "")
              : numericalValue.toString()
          }
          onClick={() => {
            setUseTextValue(false);
          }}
          onBlur={() => {
            setUseTextValue(true);
          }}
        />
        <IncreaseButton
          onClick={() => {
            let newValue =
              numericalValue + (changeInterval ? changeInterval : 1);
            if (maxValue == null || newValue <= maxValue)
              setNumericalValue(newValue);
          }}
        >
          +
        </IncreaseButton>
      </TextAreaContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextAreaTitle = styled.div`
  text-align: left;
  padding-left: 0.9rem;
  margin-bottom: 0.2rem;
  font-size: 16px;
  font-weight: 400;
`;

const DecreaseButton = styled.div`
  min-height: 3rem;
  min-width: 3rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 2rem;
  font-weight: 300;
  border-radius: ${BorderRadius.Default} 0 0 ${BorderRadius.Default};
  background-color: ${Color.White};
  color: ${Color.Dark};

  -webkit-appearance: none !important;
  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 1;

  cursor: pointer;

  &:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    transition-duration: 0.05s;
  }

  -moz-user-select: none; /* firefox */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE*/
  user-select: none; /* Standard syntax */
`;

const IncreaseButton = styled.div`
  min-height: 3rem;
  min-width: 3rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 2rem;
  font-weight: 300;
  border-radius: 0 ${BorderRadius.Default} ${BorderRadius.Default} 0;
  background-color: ${Color.White};
  color: ${Color.Dark};

  -webkit-appearance: none !important;
  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  cursor: pointer;

  &:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    transition-duration: 0.05s;
  }

  -moz-user-select: none; /* firefox */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE*/
  user-select: none; /* Standard syntax */
`;

const TextAreaContainer = styled.div`
  display: flex;
`;

const CustomTextArea = styled.input`
  width: ${(props) => (props.Width ? props.Width - 6.7 + "rem" : "10.3rem")};
  display: flex;
  background-color: ${(props) => (props.color ? props.color : Color.Blue)};
  border: none;
  resize: none;
  outline: none;
  min-height: 3rem;
  font-family: "Jost";
  font-size: 1rem;
  overflow: hidden;
  color: ${(props) => (props.textColor ? props.textColor : Color.Dark)};
  text-align: center;

  ::placeholder {
    color: ${Color.White};
    opacity: 0.5;
  }

  -webkit-appearance: none !important;
  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default NumericInput;
