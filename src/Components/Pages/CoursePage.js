import styled from "styled-components";
import { Color } from "../Constants";
import ThickButton from "../ThickButton.js";
import HorizontalLine from "../HorizontalLine";
import ThinButton from "../ThinButton";
import Spacing from "../Spacing";
import { Link, useNavigate, useParams } from "react-router-dom";
import CenterScreen from "../CenterScreen";
import AdvancedSpacing from "../AdvancedSpacing";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "../TextField";
import CourseContainer from "../CourseContainer";
import { GetCourse } from "../../Api";
import CourseInfo from "../CourseInfo";
import DifficultySelection from "../DifficultySelection";

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const [failed, setFailed] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function FetchCourse() {
      let response = await GetCourse(id);
      if (response.status === 200) setCourse(await response.json());
      else setFailed(true);
    }

    if (!failed && course == null) {
      FetchCourse();
    }
  }, [course, failed, id]);

  return (
    <CenterScreen>
      <MainContainer>
        <ComponentContainer>
          {course ? (
            <>
              <Spacing Height={"2rem"}></Spacing>
              <CourseInfo title={course.name} />
            </>
          ) : (
            <>
              {failed ? (
                <SubHeader>Fel när kursen skulle hämtas :(</SubHeader>
              ) : (
                <SubHeader>Hämtar kurs</SubHeader>
              )}
            </>
          )}
          <Spacing Height={"2rem"} />
          <SmallTextContainer>
            <SmallText>Välj svårhetsgrad för uppgifter</SmallText>
          </SmallTextContainer>
          <Spacing Height={"0.5rem"} />
          <DifficultySelection
            width={20}
            allowMultipleSettings={true}
            onChangedDifficultySetting={(difficulty) => {
              console.log(difficulty);
            }}
          ></DifficultySelection>
          <Spacing Height={"2rem"} />
          <ThickButton width={20}>
            {"Ge mig uppgifter!" +
              (randomNumberInRange(0, 100) < 2 ? " (Snälla)" : "")}
          </ThickButton>
        </ComponentContainer>
        <ComponentContainerBottom>
          <Link to={"/courses"}>
            <ThinButton
              Width={"20rem"}
              Color={Color.Red}
              TextColor={Color.Dark}
            >
              Tillbaka
            </ThinButton>
          </Link>
          <Spacing Height={"2rem"}></Spacing>
        </ComponentContainerBottom>
      </MainContainer>
    </CenterScreen>
  );
};

const ComponentContainerBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
`;

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ComponentContainerMiddle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 70vh;
`;

const SmallTextContainer = styled.div`
  width: 20rem;
`;

const SmallText = styled.div`
  text-align: left;
  padding-left: 0.9rem;
  margin-bottom: 0.2rem;
  font-size: 16px;
  font-weight: 400;
`;

const SubHeader = styled.div`
  font-size: 1.3em;
  color: ${Color.White};
  //max-width: 32rem;
  width: 100%;
`;

const MainContainer = styled.div`
  height: 100vh;
  max-height: 812px;
  font-size: 1em;
  font-family: "Jost";
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 640px) {
    text-align: center;
  }
`;

function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default CoursePage;
