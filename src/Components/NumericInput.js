import { useState } from "react";
import styled from "styled-components";
import { BorderRadius, Color } from "./Constants";

const NumericInput = ({
  title,
  placeHolder,
  type,
  setState,
  onSumbit,
  width,
  color,
  textColor,
}) => {
  const [value, setValue] = useState("180 minuter");

  return (
    <Container Width={width}>
      <TextAreaTitle>{title}</TextAreaTitle>
      <CustomTextArea
        color={color}
        textColor={textColor}
        width={width}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            if (onSumbit) onSumbit();
          }
        }}
        onChange={(event) => {
          setValue(event.target.value);
          if (setState) setState(event.target.value);
        }}
        type={type}
        placeholder={placeHolder}
        value={value}
      />
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

const CustomTextArea = styled.input`
  width: ${(props) => (props.Width ? props.Width - 1.7 + "rem" : "16.3rem")};
  display: flex;
  background-color: ${(props) => (props.color ? props.color : Color.Blue)};
  border: none;
  border-radius: ${BorderRadius.Default};
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
