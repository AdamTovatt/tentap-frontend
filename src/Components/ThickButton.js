import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";

const ThickButton = (props) => {
  return (
    <>
      {props.secondLine ? (
        <ThickButtonHtml {...props}>
          <ThickButtonText style={{ fontWeight: 500 }}>
            {props.children}
          </ThickButtonText>
          <ThickButtonText>{props.secondLine}</ThickButtonText>
        </ThickButtonHtml>
      ) : (
        <ThickButtonHtml {...props}>{props.children}</ThickButtonHtml>
      )}
    </>
  );
};

const ThickButtonText = styled.div`
  text-decoration: none;
`;

const ThickButtonHtml = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => (props.Color ? props.Color : Color.Blue)};
  font-size: 1em;
  font-family: "Jost";
  max-height: 5.25rem;
  height: 5.25rem;
  width: ${(props) => (props.width ? props.width + "rem" : "18rem")};
  border-radius: ${BorderRadius.Default};
  border: none;
  color: ${(props) => (props.TextColor ? props.TextColor : Color.White)};
  text-decoration: none;

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

export default ThickButton;
