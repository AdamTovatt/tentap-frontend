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
  GetAllModulesForCourse,
  GetAllSourcesForCourse,
  CreateNewModule,
  GetBasePath,
  CreateNewExercise,
  GetExerciseById,
  GetAllExercisesForCourse,
} from "../../Api";
import TextField from "../TextField";
import CourseContainer from "../CourseContainer";
import SourceContainer from "../SourceContainer";
import DifficultySelection from "../DifficultySelection";
import SquareImageButton from "../SquareImageButton";
import ModuleContainer from "../ModuleContainer";
import ExerciseContainer from "../ExerciseContainer";

const AdminPage = () => {
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState(null);
  const [source, setSource] = useState(null);
  const [coursesFetchError, setCoursesFetchError] = useState(false);
  const [coursesSearchText, setCoursesSearchText] = useState("");
  const [creatingNewCourse, setCreatingNewCourse] = useState(false);
  const [creatingNewSource, setCreatingNewSource] = useState(false);
  const [settingSource, setSettingsSource] = useState(false);
  const [module, setModule] = useState(null);
  const [settingModule, setSettingModule] = useState(false);
  const [creatingModule, setCreatingModule] = useState(false);
  const [sources, setSources] = useState(null);
  const [modules, setModules] = useState(null);
  const [difficultySettings, setDifficultySettings] = useState(null);
  const [exercise, setExercise] = useState(null);
  const [exercises, setExercises] = useState(null);

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
      setSources(await response.json());
    }

    async function FetchModules() {
      let response = await GetAllModulesForCourse(course.id);
      setModules(await response.json());
    }

    async function FetchExercises() {
      let response = await GetAllExercisesForCourse(course.id, false);
      if (response.status === 200) {
        setExercises(await response.json());
      } else {
        setExercises([]);
      }
    }

    if (courses === null) FetchCourses();
    if (course !== null && sources === null) FetchSources();
    if (course !== null && modules === null) FetchModules();
    if (course !== null && exercises === null) FetchExercises();
  }, [
    navigate,
    isLoggedIn,
    coursesSearchText,
    courses,
    sources,
    course,
    modules,
    exercise,
    exercises,
  ]);

  return (
    <CenterScreen>
      <CornerMenu>
        <Link to={"/me"}>
          <ThinButton Width={"7rem"} Color={Color.Red} TextColor={Color.Dark}>
            Tillbaka
          </ThinButton>
        </Link>
      </CornerMenu>
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
                      setModules(null);
                      setSource(null);
                      setModule(null);
                      setExercises(null);
                      setDifficultySettings(null);
                      setSettingModule(false);
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
        </AdminSection>
        <AdminSection>
          {course ? (
            <>
              <SubHeader>Skapa eller välj en uppgift</SubHeader>
              <Spacing Height={"2.2rem"} />
              <ExerciseContainer
                width={20}
                height={45}
                exerciseSelected={(exerciseId) => {
                  let exercise = exercises.find((x) => x.id === exerciseId);
                  setExercise(exercise);
                  setSource(exercise.source);
                  setModule(exercise.module);

                  if (exercise.difficulty > 0) {
                    let difficultyArray = [false, false, false];
                    difficultyArray[exercise.difficulty - 1] = true;
                    setDifficultySettings(difficultyArray);
                  }
                }}
                createExercise={() => {
                  setExercise(null);
                  setSource(null);
                }}
                exercises={exercises ? exercises : []}
              />
            </>
          ) : (
            <LockedSection>
              <LockedText>Här kan du redigera en uppgift</LockedText>
            </LockedSection>
          )}
        </AdminSection>
        <AdminSection>
          {course === null ? (
            <AdminSection>
              <LockedSection>
                <LockedText>Här kan du redigera en uppgift</LockedText>
              </LockedSection>
            </AdminSection>
          ) : (
            <AdminSection>
              {settingModule ? (
                <>
                  {creatingModule ? (
                    <CreateNewModuleModule
                      onCancel={() => {
                        setCreatingModule(false);
                      }}
                      onCreate={async (newModuleName) => {
                        let createResult = await CreateNewModule(
                          course.id,
                          newModuleName
                        );
                        if (createResult.status === 200) {
                          setCreatingModule(false);
                          setModules(null);
                        }
                      }}
                    />
                  ) : (
                    <>
                      {modules === null ? null : (
                        <>
                          <ModuleContainer
                            width={20}
                            moduleSelected={(moduleId) => {
                              setModule(modules.find((x) => x.id === moduleId));
                              setSettingModule(false);
                            }}
                            createModule={() => {
                              setCreatingModule(true);
                            }}
                            modules={modules}
                          />
                          <ThinButton
                            Width={"20rem"}
                            onClick={() => {
                              setSettingModule(false);
                            }}
                            TextColor={Color.Dark}
                            Color={Color.Red}
                          >
                            Avbryt
                          </ThinButton>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {settingSource ? (
                    <>
                      <ComponentContainer>
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
                                setModules(null);
                              }
                            }}
                          />
                        ) : (
                          <>
                            {sources === null ? null : (
                              <>
                                <SourceContainer
                                  height={35}
                                  width={20}
                                  sourceSelected={(sourceId) => {
                                    setSource(
                                      sources.find((x) => x.id === sourceId)
                                    );
                                    setSettingModule(false);
                                    setCreatingModule(false);
                                    setSettingsSource(false);
                                  }}
                                  createSource={() => {
                                    setCreatingNewSource(true);
                                  }}
                                  sources={sources}
                                />
                                <Spacing Height={"1.2rem"} />
                                <ThinButton
                                  Width={"20rem"}
                                  onClick={() => {
                                    setSettingsSource(false);
                                  }}
                                  TextColor={Color.Dark}
                                  Color={Color.Red}
                                >
                                  Avbryt
                                </ThinButton>
                              </>
                            )}
                          </>
                        )}
                      </ComponentContainer>
                    </>
                  ) : (
                    <>
                      <ComponentContainer>
                        <BodyText>Svårhetsgrad</BodyText>
                        <Spacing Height={"0.5rem"} />
                        <DifficultySelection
                          width={20}
                          allowMultipleSettings={false}
                          onChangedDifficultySetting={(difficultySettings) => {
                            setDifficultySettings(difficultySettings);
                          }}
                          defaultSetting={difficultySettings}
                        />
                        <Spacing Height={"1.2rem"} />
                        <BodyText>Tenta</BodyText>
                        <Spacing Height={"0.5rem"} />
                        <ThickButton
                          secondLine={source ? source.date.split("T")[0] : ""}
                          width={20}
                          onClick={() => {
                            setSettingsSource(true);
                          }}
                        >
                          {source ? source.author : "(Tryck för att välja)"}
                        </ThickButton>
                        <Spacing Height={"1.2rem"} />
                        <BodyText>Modul</BodyText>
                        <Spacing Height={"0.5rem"} />
                        <ThickButton
                          onClick={() => {
                            setSettingModule(true);
                          }}
                          width={20}
                        >
                          {module === null
                            ? "(Tryck för att välja)"
                            : module.name}
                        </ThickButton>
                        <Spacing Height={"1.6rem"} />
                        <SquareButtonContainers>
                          <SquareButtonText>Problem</SquareButtonText>
                          <SquareButtonText>Lösning</SquareButtonText>
                        </SquareButtonContainers>
                        <Spacing Height={"0.5rem"} />
                        <SquareButtonContainers>
                          <SquareImageButton
                            onClick={async () => {
                              if (exercise) {
                                let result = await GetExerciseById(exercise.id);
                                let json = await result.json();
                                setExercise(json);
                                if (result.status === 200) {
                                } else {
                                  console.log("Fel när övning skulle hämtas");
                                }
                              }
                            }}
                            source={
                              exercise && exercise.problemImage
                                ? exercise.problemImage.url
                                : null
                            }
                          />
                          <SquareImageButton
                            onClick={async () => {
                              if (exercise) {
                                let result = await GetExerciseById(exercise.id);
                                let json = await result.json();
                                setExercise(json);
                                if (result.status === 200) {
                                } else {
                                  console.log("Fel när övning skulle hämtas");
                                }
                              }
                            }}
                            source={
                              exercise && exercise.solutionImage
                                ? exercise.solutionImage.url
                                : null
                            }
                          />
                        </SquareButtonContainers>
                        <Spacing Height={"2.2rem"} />
                      </ComponentContainer>

                      <ComponentContainer>
                        <ThinButton
                          onClick={async () => {
                            let id = await HandleSave(
                              source,
                              difficultySettings,
                              module,
                              exercise,
                              setExercise,
                              setExercises
                            );
                            window.location =
                              "tentap:" +
                              JSON.stringify({
                                exerciseId: id,
                                apiUrl: GetBasePath(),
                                token: userInfo.token,
                              });
                          }}
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
                          onClick={async () => {
                            if (
                              (await HandleSave(
                                source,
                                difficultySettings,
                                module,
                                exercise,
                                setExercise,
                                setExercises
                              )) !== 0
                            ) {
                              console.log("Uppgift sparades");
                            }
                          }}
                        >
                          Spara uppgift
                        </ThinButton>
                      </ComponentContainer>
                    </>
                  )}
                </>
              )}
            </AdminSection>
          )}
        </AdminSection>
      </SectionsMainContainer>
    </CenterScreen>
  );
};

async function HandleSave(
  source,
  difficultySettings,
  module,
  exercise,
  setExercise,
  setExercises
) {
  if (module === null) {
    alert("Du måste välja modul först");
    return;
  }
  if (source === null) {
    alert("Du måste välja tenta först"); //should never be able to get here but check anyway
    return;
  }
  if (
    difficultySettings === null ||
    GetSingleDifficulty(difficultySettings) === 0
  ) {
    alert("Du måste välja svårhetsgrad först");
    return;
  }

  let response = await CreateNewExercise(
    exercise ? exercise.id : undefined,
    GetSingleDifficulty(difficultySettings),
    source.id,
    module.id
  );

  if (response.status === 200) {
    let json = await response.json();
    setExercise(json);
    setExercises(null);
    return json.id;
  } else {
    alert("Fel när övning skulle skapas");
    return 0;
  }
}

function GetSingleDifficulty(difficultySettings) {
  for (let i = 0; i < difficultySettings.length; i++) {
    if (difficultySettings[i]) return i + 1;
  }
  return 0;
}

const CornerMenu = styled.div`
  position: absolute;
  left: 4rem;
  top: 4rem;
`;

const CreateNewModuleModule = ({ onCancel, onCreate }) => {
  const [newModuleName, setNewModuleName] = useState("");

  return (
    <CreateNewDiv>
      <Spacing Height={"0.9rem"} />
      <TextField
        width={18}
        setState={setNewModuleName}
        title={"Modulnamn:"}
        placeHolder={"Namn på modulen"}
      />
      <Spacing Height={"1rem"} />
      <ThinButton
        Color={Color.Cyan}
        TextColor={Color.Dark}
        onClick={async () => {
          if (newModuleName !== "") {
            await onCreate(newModuleName);
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
    </CreateNewDiv>
  );
};

const CreateNewSourceModule = ({ onCancel, onCreate }) => {
  const [newSourceAuthor, setNewSourceAuthor] = useState("");
  const [newSourceDate, setNewSourceDate] = useState("");

  return (
    <CreateNewDiv>
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
    </CreateNewDiv>
  );
};

const CreateNewCourseModule = ({ onCancel, onCreate }) => {
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseCode, setNewCourseCode] = useState("");

  return (
    <CreateNewDiv>
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
    </CreateNewDiv>
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

const CreateNewDiv = styled.div`
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
