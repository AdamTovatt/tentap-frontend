import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";
import LoadingBar from "./LoadingBar";
import Spacing from "./Spacing";
import ThickButton from "./ThickButton";
import { Link, useNavigate, useParams } from "react-router-dom";

const CourseInfo = ({ title, width, showLoginButton }) => {
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
          </>
        )}
        <Spacing Height={"0.2rem"} />
      </CourseInfoBackground>
    </>
  );
};

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
