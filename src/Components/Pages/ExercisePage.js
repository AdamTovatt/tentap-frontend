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
import { GetCourse, GetExerciseById, GetNextExercise } from "../../Api";
import CourseInfo from "../CourseInfo";
import DifficultySelection from "../DifficultySelection";
import SquareImageButton from "../SquareImageButton";
import { PulseLoader as Loader } from "react-spinners";
import ImagePreviewButton from "../ImagePreviewButton";
import ImageViewer from "../ImageViewer";
import { width } from "@mui/system";

const ExercisePage = () => {
  const [exercise, setExercise] = useState(null);
  const [failed, setFailed] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);

  const { courseId, exerciseId } = useParams();

  const navigate = useNavigate();
  const mediaQuery = useMediaQuery("(max-height:640px)");

  useEffect(() => {
    async function FetchExercise() {
      let response = await GetExerciseById(exerciseId);
      if (response.status === 200) {
        let json = await response.json();
        console.log(json);
        setExercise(json);
      } else {
        if (response.status === 204) navigate("/course/" + courseId);
        setFailed(true);
      }
    }

    if (!failed && exercise == null) {
      FetchExercise();
    }
  }, [exercise, failed, exerciseId, courseId, navigate]);

  return (
    <>
      {imageToShow ? (
        <MainContainer>
          <ImageViewer source={imageToShow}></ImageViewer>
          <Spacing Height={"0rem"} />
          <ThinButton
            TextColor={Color.Dark}
            Color={Color.Red}
            onClick={() => {
              setImageToShow(null);
            }}
          >
            Tillbaka
          </ThinButton>
        </MainContainer>
      ) : (
        <CenterScreen>
          <MainContainer>
            <ComponentContainer>
              {exercise ? (
                <>
                  <AdvancedSpacing
                    MinHeight={0.1}
                    MaxHeight={1}
                    ScreenPercentage={0.0}
                  />
                  <SubHeader>
                    {"Uppgift från " +
                      exercise.source.author +
                      " (" +
                      exercise.source.date.toString().split("T")[0] +
                      ")"}
                  </SubHeader>
                  <AdvancedSpacing
                    MinHeight={1}
                    MaxHeight={2.5}
                    ScreenPercentage={4}
                  />
                  <SmallTextContainer>
                    <SmallText>Problem (tryck för att visa större):</SmallText>
                  </SmallTextContainer>
                  <Spacing Height={"0.4rem"} />
                  <ImagePreviewButton
                    source={exercise.problemImage.url}
                    onClick={() => {
                      setImageToShow(exercise.problemImage.url);
                    }}
                  />
                  <AdvancedSpacing
                    MinHeight={1}
                    MaxHeight={2.5}
                    ScreenPercentage={4}
                  />
                  <SmallTextContainer>
                    {showSolution ? (
                      <SmallText>
                        Lösning (tryck för att visa större):
                      </SmallText>
                    ) : (
                      <SmallText>Lösning (tryck för att visa):</SmallText>
                    )}
                  </SmallTextContainer>
                  <Spacing Height={"0.4rem"} />
                  <ImagePreviewButton
                    onClick={() => {
                      if (!showSolution) setShowSolution(true);
                      else setImageToShow(exercise.solutionImage.url);
                    }}
                    startHidden={!showSolution}
                    source={exercise.solutionImage.url}
                  />
                </>
              ) : (
                <>
                  <Loader color={Color.Blue} />
                </>
              )}
            </ComponentContainer>
            <ComponentContainerBottom>
              {mediaQuery ? (
                <>
                  <SideBySideButtonContainer>
                    <ThinButton
                      Color={Color.Green}
                      TextColor={Color.Dark}
                      Width={"9.7rem"}
                    >
                      Markera uppgift som slutförd
                    </ThinButton>
                    <HorizontalSpacing />
                    <AdvancedSpacing
                      MinHeight={0.2}
                      MaxHeight={1}
                      ScreenPercentage={1}
                    />
                    <ThinButton Width={"9.7rem"}>
                      Ta en annan uppgift
                    </ThinButton>
                  </SideBySideButtonContainer>
                </>
              ) : (
                <>
                  <ThinButton
                    Color={Color.Green}
                    TextColor={Color.Dark}
                    Width={"20rem"}
                  >
                    Markera uppgift som slutförd
                  </ThinButton>
                  <HorizontalSpacing />
                  <AdvancedSpacing
                    MinHeight={0.2}
                    MaxHeight={1}
                    ScreenPercentage={1}
                  />
                  <ThinButton Width={"20rem"}>Ta en annan uppgift</ThinButton>
                </>
              )}
              <AdvancedSpacing
                MinHeight={0.2}
                MaxHeight={1}
                ScreenPercentage={1}
              />
              <Link to={"/course/" + courseId}>
                <ThinButton
                  Color={Color.Red}
                  TextColor={Color.Dark}
                  Width={"20rem"}
                >
                  Tillbaka
                </ThinButton>
              </Link>
              <AdvancedSpacing
                MinHeight={2}
                MaxHeight={2}
                ScreenPercentage={6}
              />
            </ComponentContainerBottom>
          </MainContainer>
        </CenterScreen>
      )}
    </>
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
  width: 100%;

  max-width: 33rem;
  min-height: 3.5rem;
  margin-top: 1.5rem;

  word-break: keep-all;

  @media (max-width: 640px) {
    max-width: 18rem;
  }
`;

const HorizontalSpacing = styled.div`
  width: 0.6rem;
`;

const SideBySideButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
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

export default ExercisePage;
