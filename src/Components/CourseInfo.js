import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";
import LoadingBar from "./LoadingBar";
import Spacing from "./Spacing";
import ThickButton from "./ThickButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PulseLoader as Loader } from "react-spinners";
import { keyframes } from "styled-components";

const CourseInfo = ({
  title,
  width,
  showLoginButton,
  courseCompletionInfo,
}) => {
  return (
    <>
      <CourseInfoBackground width={width}>
        <CourseInfoHeader>{title}</CourseInfoHeader>
        {showLoginButton ? (
          <LoginButtonContainer>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <ThickButton
                secondLine={"för att se avklarade uppgifter"}
                TextColor={Color.Dark}
                Color={Color.Cyan}
              >
                Logga in
              </ThickButton>
            </Link>
          </LoginButtonContainer>
        ) : (
          <>
            {courseCompletionInfo ? (
              <>
                <LoadingBar
                  text={GetText(courseCompletionInfo.easy)}
                  completion={GetCompletion(courseCompletionInfo.easy)}
                  width={width - 2}
                  color={Color.Green}
                />
                <LoadingBar
                  text={GetText(courseCompletionInfo.medium)}
                  completion={GetCompletion(courseCompletionInfo.medium)}
                  width={width - 2}
                  color={Color.Yellow}
                />
                <LoadingBar
                  text={GetText(courseCompletionInfo.hard)}
                  completion={GetCompletion(courseCompletionInfo.hard)}
                  width={width - 2}
                  color={Color.Red}
                />
              </>
            ) : (
              <>
                <Spacing Height={"2rem"} />
                <Loader color={Color.Dark} />
                <Spacing Height={"3rem"} />
              </>
            )}
          </>
        )}
        <Spacing Height={"0.2rem"} />
      </CourseInfoBackground>
    </>
  );
};

function GetText(difficultyLevel) {
  return (
    difficultyLevel.completed.toString() +
    "/" +
    difficultyLevel.total.toString()
  );
}

function GetCompletion(difficultyLevel) {
  if (difficultyLevel.total === 0) return 0;
  return difficultyLevel.completed / difficultyLevel.total;
}

const LoginButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9rem;
`;

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
