import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";
import Spacing from "./Spacing";

const LoadingBar = ({ width, completion, text, color }) => {
  return (
    <LoadingBarBackground width={width} color={color}>
      <LoadingBarParent>
        <LoadingBarFill width={width * completion} color={color} />
      </LoadingBarParent>
      <Text>{text}</Text>
    </LoadingBarBackground>
  );
};

const LoadingBarBackground = styled.div`
  max-width: 100%;
  outline: ${(props) => (props.color ? props.color : Color.White)} solid 3px;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 0.9rem;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
`;

const LoadingBarParent = styled.div`
  position: absolute;
  z-index: 1;
`;

const LoadingBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width + "rem"};
  height: 1.5rem;
  background-color: ${(props) => (props.color ? props.color : Color.White)};
  border-radius: 0px;
  z-index: 1;
`;

const Text = styled.div`
  font-family: "Jost";
  color: ${Color.Dark};
  position: relative;
  z-index: 2;
`;

export default LoadingBar;
