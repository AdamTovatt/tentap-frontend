import styled from "styled-components";
import { Color } from "../Constants";
import ThickButton from "../ThickButton.js";
import HorizontalLine from "../HorizontalLine";
import ThinButton from "../ThinButton";
import Spacing from "../Spacing";
import { Link, useNavigate } from "react-router-dom";
import CenterScreen from "../CenterScreen";
import AdvancedSpacing from "../AdvancedSpacing";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "../TextField";
import CourseContainer from "../CourseContainer";
import { GetAllCourses } from "../../Api";

const CoursesPage = () => {
  const [courses, setCourses] = useState(null);
  const [fetchingCourses, setFetchingCourses] = useState(false);
  const [hasFetchedCourses, setHasFetchedCourses] = useState(false);
  const [coursesSearchText, setCoursesSearchText] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function FetchCourses() {
      setFetchingCourses(true);
      let response = await GetAllCourses(false); //false: don't include hidden courses
      setFetchingCourses(false);
      if (response.status === 200) setCourses(await response.json());
      setHasFetchedCourses(true);
    }

    if (!hasFetchedCourses) {
      FetchCourses();
    }
  }, [courses, fetchingCourses, hasFetchedCourses]);

  return (
    <CenterScreen>
      <MainContainer>
        {!courses ? (
          <>
            {hasFetchedCourses ? (
              <ComponentContainer>
                <Spacing Height={"1.2rem"} />
                <SubHeader>
                  Något gick fel när kurser skulle laddas. Ladda om sidan för
                  att försöka igen.
                </SubHeader>
                <SubHeader>
                  Om problemet kvarstår får du gärna skicka ett mail till
                  adam@sakur.se och skriva att kurserna inte laddar in
                </SubHeader>
              </ComponentContainer>
            ) : (
              <>
                <ComponentContainer>
                  <Spacing Height={"1.2rem"} />
                  <SubHeader>Laddar kurser</SubHeader>
                </ComponentContainer>
              </>
            )}
          </>
        ) : (
          <>
            <Spacing Height={"0.2rem"} />
            <ComponentContainer>
              <Spacing Height={"1.2rem"} />
              <TextField
                setState={setCoursesSearchText}
                title={"Sök:"}
                placeHolder={"Kursnamn eller kod..."}
                width={20}
              ></TextField>
            </ComponentContainer>
            <ComponentContainerMiddle>
              <AdvancedSpacing
                MinHeight={1.2}
                MaxHeight={4.6}
                ScreenPercentage={3}
              />
              <SmallTextContainer>
                <SmallText>Kurser ({courses.length}):</SmallText>
              </SmallTextContainer>
              <Spacing Height={"0.2rem"} />
              <CourseContainer
                width={20}
                courseSelected={(courseId) => {
                  navigate("/course/" + courseId);
                }}
                courses={courses}
              />
            </ComponentContainerMiddle>
            <ComponentContainerBottom>
              <Link to={"/"}>
                <ThinButton
                  Color={Color.Red}
                  TextColor={Color.Dark}
                  Width={"20rem"}
                >
                  Tillbaka
                </ThinButton>
              </Link>
              <Spacing Height={"1.8rem"} />
            </ComponentContainerBottom>
          </>
        )}
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

export default CoursesPage;
