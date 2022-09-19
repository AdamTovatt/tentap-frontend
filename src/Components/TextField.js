import styled from "styled-components";
import { BorderRadius, Color } from "./Constants";

const TextField = ({ title, placeHolder, type, setState, onSumbit }) => {
  return (
    <TextFieldContainer>
      <TextAreaTitle>{title}</TextAreaTitle>
      <CustomTextArea
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            if (onSumbit) onSumbit();
          }
        }}
        onChange={(event) => {
          setState(event.target.value);
        }}
        type={type}
        placeholder={placeHolder}
      />
    </TextFieldContainer>
  );
};

const TextFieldContainer = styled.div``;

const TextAreaTitle = styled.div`
  text-align: left;
  padding-left: 0.9rem;
  margin-bottom: 0.2rem;
  font-size: 16px;
  font-weight: 400;
`;

const CustomTextArea = styled.input`
  width: ${(props) => (props.Width ? props.Width : "16.3rem")};
  background-color: ${(props) => (props.Color ? props.Color : Color.Blue)};
  border: none;
  border-radius: ${BorderRadius.Default};
  resize: none;
  outline: none;
  padding: 0.8rem;
  padding-bottom: 0.9rem;
  padding-left: 0.9rem;
  min-height: 1.25rem;
  max-height: 1.25rem;
  font-family: "Jost";
  font-size: 16px;
  overflow: hidden;
  color: ${Color.White};

  ::placeholder {
    color: ${Color.White};
    opacity: 0.5;
  }

  -webkit-appearance: none !important;
  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default TextField;
