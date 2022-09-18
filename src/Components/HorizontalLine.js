import styled from "styled-components";
import { Color } from "./Constants";

const HorizontalLine = styled.div`
  background-color: ${(props) => (props.Color ? props.Color : Color.White)};
  font-size: 1em;
  font-family: "Jost";
  width: ${(props) => (props.Width ? props.Width : "248px")};
  min-height: 1px;
  border-radius: 1px;
  border: none;

  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default HorizontalLine;
