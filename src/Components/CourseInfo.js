import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";
import LoadingBar from "./LoadingBar";
import Spacing from "./Spacing";

const CourseInfo = ({ title, width }) => {
  return (
    <CourseInfoBackground width={width}>
      <CourseInfoHeader>{title}</CourseInfoHeader>
      <LoadingBar
        text={"25/50"}
        completion={0.5}
        width={20}
        color={Color.Green}
      />
      <LoadingBar
        text={"8/24"}
        completion={0.33333}
        width={20}
        color={Color.Yellow}
      />
      <LoadingBar
        text={"7/9"}
        completion={0.777777}
        width={20}
        color={Color.Red}
      />
      <Spacing Height={"0.2rem"} />
    </CourseInfoBackground>
  );
};

const CourseInfoBackground = styled.div`
  width: ${(props) => (props.width ? props.width + "rem" : "20rem")};
  background-color: ${Color.Blue};
  border-radius: ${BorderRadius.Default};
`;

const CourseInfoHeader = styled.div`
  font-family: "Jost";
  margin-top: 1rem;
  margin-bottom: 1.4rem;
`;

export default CourseInfo;
