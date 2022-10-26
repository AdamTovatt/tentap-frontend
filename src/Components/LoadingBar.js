import styled from "styled-components";
import { keyframes } from "styled-components";
import { Color, BorderRadius } from "./Constants";
import Spacing from "./Spacing";

const LoadingBar = ({ width, completion, text, color }) => {
  console.log("fill: " + width * completion);
  return (
    <LoadingBarBackground width={width} color={color}>
      <LoadingBarParent>
        <LoadingBarFill width={width * completion} color={color} />
      </LoadingBarParent>
      <Text>{text}</Text>
    </LoadingBarBackground>
  );
};

const animateShowFill = (width) => keyframes`
  0%
  {
    width: 0;
  }
  40%
  {
    width: (width * 0.7) + "rem";
  }
  90%
  {
    width: (width * 0.8) + "rem";
  }
  100%
  {
    width: width + "rem";
  }
`;

const LoadingBarBackground = styled.div`
  width: ${(props) => (props.width ? props.width + "rem" : "20rem")};
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
  animation: ${(props) => animateShowFill(props.width)} 0.5s ease forwards;
`;

const Text = styled.div`
  font-family: "Jost";
  color: ${Color.Dark};
  position: relative;
  z-index: 2;
`;

export default LoadingBar;
