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
import {
  CreateNewCourse,
  CreateNewSource,
  GetAllCourses,
  GetAllSourcesForCourse,
} from "../../Api";
import TextField from "../TextField";
import CourseContainer from "../CourseContainer";
import SourceContainer from "../SourceContainer";
import DifficultySelection from "../DifficultySelection";
import SquareImageButton from "../SquareImageButton";

const AdminPage = () => {
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState(null);
  const [source, setSource] = useState(null);
  const [coursesFetchError, setCoursesFetchError] = useState(false);
  const [coursesSearchText, setCoursesSearchText] = useState("");
  const [creatingNewCourse, setCreatingNewCourse] = useState(false);
  const [creatingNewSource, setCreatingNewSource] = useState(false);
  const [sources, setSources] = useState(null);

  const cookies = new Cookies();
  const navigate = useNavigate();

  const userInfo = cookies.get("userInfo");
  const isLoggedIn = userInfo !== undefined && userInfo != null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    async function FetchCourses() {
      let response = await GetAllCourses();
      setCourses(await response.json());
    }

    async function FetchSources() {
      let response = await GetAllSourcesForCourse(course.id);
      console.log(response.status);
      setSources(await response.json());
    }

    if (courses === null) FetchCourses();
    if (course !== null && sources === null) FetchSources();
  }, [navigate, isLoggedIn, coursesSearchText, courses, sources, course]);

  return (
    <CenterScreen>
      <SectionsMainContainer>
        <AdminSection>
          <ComponentContainer>
            <SubHeader>Skapa eller välj en kurs att redigera</SubHeader>
            <Spacing Height={"2.2rem"} />
            <TextField
              setState={setCoursesSearchText}
              title={"Sök:"}
              placeHolder={"Kursnamn eller kod..."}
              width={20}
            ></TextField>
            <Spacing Height={"2.2rem"} />
            {courses ? (
              <>
                {creatingNewCourse ? (
                  <CreateNewCourseModule
                    onCancel={() => {
                      setCreatingNewCourse(false);
                    }}
                    onCreate={async (courseName, courseCode) => {
                      let createResult = await CreateNewCourse(
                        courseName,
                        courseCode
                      );

                      if (createResult.status === 200) {
                        setCreatingNewCourse(false);
                        setCourses(null);
                      }
                    }}
                  />
                ) : (
                  <CourseContainer
                    width={20}
                    courseSelected={(courseId) => {
                      setCourse(courses.find((x) => x.id === courseId));
                      setSources(null);
                      setCreatingNewSource(false);
                    }}
                    createCourse={() => {
                      setCreatingNewCourse(true);
                      setCreatingNewSource(false);
                    }}
                    courses={courses}
                  />
                )}
              </>
            ) : null}
          </ComponentContainer>
          <ComponentContainer>
            <Spacing Height={"2.2rem"} />
            <Link to={"/me"}>
              <ThinButton
                Width={"20rem"}
                Color={Color.Red}
                TextColor={Color.Dark}
              >
                Tillbaka
              </ThinButton>
            </Link>
          </ComponentContainer>
        </AdminSection>
        {course === null ? (
          <AdminSection>
            <LockedSection>
              <LockedText>
                Här visas tentor när du har valt en kurs till vänster
              </LockedText>
            </LockedSection>
          </AdminSection>
        ) : (
          <AdminSection>
            <ComponentContainer>
              <SubHeader>{course.name}</SubHeader>
              <Spacing Height={"2.2rem"} />
              <TextField
                setState={setCoursesSearchText}
                title={"Sök:"}
                placeHolder={"Kursnamn eller kod..."}
                width={20}
              ></TextField>
              <Spacing Height={"2.2rem"} />
            </ComponentContainer>
            <ComponentContainer>
              {creatingNewSource ? (
                <CreateNewSourceModule
                  onCancel={() => {
                    setCreatingNewSource(false);
                  }}
                  onCreate={async (author, sourceDate) => {
                    let createResult = await CreateNewSource(
                      course.id,
                      author,
                      sourceDate
                    );
                    if (createResult.status === 200) {
                      setCreatingNewSource(false);
                      setSources(null);
                    }
                  }}
                />
              ) : (
                <>
                  {sources === null ? null : (
                    <SourceContainer
                      width={20}
                      sourceSelected={(sourceId) => {
                        setSource(sources.find((x) => x.id === sourceId));
                      }}
                      createSource={() => {
                        setCreatingNewSource(true);
                      }}
                      sources={sources}
                    />
                  )}
                </>
              )}
            </ComponentContainer>
          </AdminSection>
        )}
        <AdminSection>
          {source === null ? (
            <AdminSection>
              <LockedSection>
                <LockedText>
                  Här kan du skapa en uppgift när du valt kurs och tenta till
                  vänster
                </LockedText>
              </LockedSection>
            </AdminSection>
          ) : (
            <AdminSection>
              <ComponentContainer>
                <SubHeader>
                  {source.author + " " + source.date.split("T")[0]}
                </SubHeader>
                <Spacing Height={"2.2rem"} />
                <BodyText>Svårhetsgrad</BodyText>
                <Spacing Height={"0.5rem"} />
                <DifficultySelection
                  width={20}
                  allowMultipleSettings={false}
                  onChangedDifficultySetting={(difficultySettings) => {
                    console.log(difficultySettings);
                  }}
                />
                <Spacing Height={"1.2rem"} />
                <BodyText>Tenta</BodyText>
                <Spacing Height={"0.5rem"} />
                <ThickButton secondLine={source.date.split("T")[0]} width={20}>
                  {source.author}
                </ThickButton>
                <Spacing Height={"1.6rem"} />
                <SquareButtonContainers>
                  <SquareButtonText>Problem</SquareButtonText>
                  <SquareButtonText>Lösning</SquareButtonText>
                </SquareButtonContainers>
                <Spacing Height={"0.5rem"} />
                <SquareButtonContainers>
                  <SquareImageButton
                    source={
                      "https://res.cloudinary.com/tentap/image/upload/v1642018188/btoitwlkeh4ktmyqw1eo.jpg"
                    }
                  />
                  <SquareImageButton />
                </SquareButtonContainers>
                <Spacing Height={"2.2rem"} />
              </ComponentContainer>
              <ComponentContainer>
                <ThinButton
                  Color={Color.Cyan}
                  TextColor={Color.Dark}
                  Width={"20rem"}
                >
                  Ladda upp nya bilder
                </ThinButton>
                <Spacing Height={"1.2rem"} />
                <ThinButton
                  Color={Color.Green}
                  TextColor={Color.Dark}
                  Width={"20rem"}
                >
                  Spara uppgift
                </ThinButton>
              </ComponentContainer>
            </AdminSection>
          )}
        </AdminSection>
      </SectionsMainContainer>
    </CenterScreen>
  );
};

const CreateNewSourceModule = ({ onCancel, onCreate }) => {
  const [newSourceAuthor, setNewSourceAuthor] = useState("");
  const [newSourceDate, setNewSourceDate] = useState("");

  return (
    <CreateNewCourseModuleDiv>
      <Spacing Height={"0.9rem"} />
      <TextField
        width={18}
        setState={setNewSourceAuthor}
        title={"Författare:"}
        placeHolder={"Namn på författaren"}
      />
      <Spacing Height={"1rem"} />
      <TextField
        width={18}
        setState={setNewSourceDate}
        title={"Datum:"}
        placeHolder={"Datum t.ex: (1999-09-18)"}
      />
      <Spacing Height={"1.5rem"} />
      <ThinButton
        Color={Color.Cyan}
        TextColor={Color.Dark}
        onClick={async () => {
          if (newSourceAuthor !== "" && newSourceDate !== "") {
            await onCreate(newSourceAuthor, newSourceDate);
          }
        }}
      >
        Skapa
      </ThinButton>
      <Spacing Height={"1rem"} />
      <ThinButton
        Color={Color.Red}
        TextColor={Color.Dark}
        onClick={() => {
          onCancel();
        }}
      >
        Avbryt
      </ThinButton>
      <Spacing Height={"1.2rem"} />
    </CreateNewCourseModuleDiv>
  );
};

const CreateNewCourseModule = ({ onCancel, onCreate }) => {
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseCode, setNewCourseCode] = useState("");

  return (
    <CreateNewCourseModuleDiv>
      <Spacing Height={"0.9rem"} />
      <TextField
        width={18}
        setState={setNewCourseName}
        title={"Kursnamn:"}
        placeHolder={"Namn på kursen"}
      />
      <Spacing Height={"1rem"} />
      <TextField
        width={18}
        setState={setNewCourseCode}
        title={"Kurskod:"}
        placeHolder={"Kod för kursen"}
      />
      <Spacing Height={"1.5rem"} />
      <ThinButton
        Color={Color.Cyan}
        TextColor={Color.Dark}
        onClick={async () => {
          if (newCourseName !== "" && newCourseCode !== "") {
            await onCreate(newCourseName, newCourseCode);
          }
        }}
      >
        Skapa
      </ThinButton>
      <Spacing Height={"1rem"} />
      <ThinButton
        Color={Color.Red}
        TextColor={Color.Dark}
        onClick={() => {
          onCancel();
        }}
      >
        Avbryt
      </ThinButton>
      <Spacing Height={"1.2rem"} />
    </CreateNewCourseModuleDiv>
  );
};

const SquareButtonText = styled.div`
  width: 9rem;
  font-weight: 500;
  font-family: "Jost";
`;

const SquareButtonContainers = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20rem;
`;

const CreateNewCourseModuleDiv = styled.div`
  width: 20rem;
  background-color: ${Color.FadedBlue};
  background-color: rgb(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
`;

const ComponentContainer = styled.div`
  width: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LockedSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Color.Blue};
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 12px;
`;

const LockedText = styled.div`
  color: ${Color.White};
  font-weight: 500;
  font-family: "Jost";
  font-size: 1.25rem;
  padding: 1.75rem;
`;

const BodyText = styled.div`
  font-size: 1rem;
  color: ${Color.White};
  max-width: 32rem;
  font-weight: 500;

  @media (max-width: 640px) {
    max-width: 18rem;
  }
`;

const SubHeader = styled.div`
  font-size: 1.1em;
  color: ${Color.White};
  max-width: 32rem;
  font-weight: 500;

  @media (max-width: 640px) {
    max-width: 18rem;
  }
`;

const SectionsMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80vw;
  max-width: 90rem;
`;

const AdminSection = styled.div`
  height: 100vh;
  max-height: 812px;
  font-size: 1em;
  font-family: "Jost";
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22rem;

  @media (min-width: 640px) {
    text-align: center;
  }
`;

export default AdminPage;
