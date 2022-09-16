import styled from "styled-components";
import { Color } from "./Constants";

const Button = styled.button`
  background-color: ${Color.Blue};
  font-size: 1em;
  font-family: "Jost";
  margin: 1em;
  padding-top: 1.875rem;
  padding-bottom: 1.875rem;
  min-width: 18rem;
  border-radius: 12px;
  border: none;
  color: ${Color.White};

  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default Button;
