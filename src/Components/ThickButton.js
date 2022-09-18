import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";

const ThickButton = styled.button`
  background-color: ${(props) => (props.Color ? props.Color : Color.Blue)};
  font-size: 1em;
  font-family: "Jost";
  padding-top: 1.875rem;
  padding-bottom: 1.875rem;
  width: ${(props) => (props.Width ? props.Width : "18rem")};
  border-radius: ${BorderRadius.Default};
  border: none;
  color: ${(props) => (props.TextColor ? props.TextColor : Color.White)};

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
