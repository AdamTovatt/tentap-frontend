import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";
import Spacing from "./Spacing";
import ThickButton from "./ThickButton";

const CourseContainer = ({ courses, courseSelected, createCourse, width }) => {
  if (!courseSelected)
    console.error(
      "Course container should have courseSelected property as a function!!"
    );

  const displayCourses = [...courses];

  if (createCourse)
    displayCourses.push({ id: -1, name: "Skapa ny", code: "+" });

  return (
    <CourseContainerDiv>
      {displayCourses.map((course) => {
        return (
          <div key={course.id}>
            {course.id !== -1 ? (
              <ThickButton
                width={width}
                onClick={() => {
                  courseSelected(course.id);
                }}
                key={course.code}
                secondLine={course.code}
              >
                {course.name}
              </ThickButton>
            ) : (
              <ThickButton
                width={width}
                Color={Color.Cyan}
                TextColor={Color.Dark}
                onClick={() => {
                  createCourse();
                }}
                key={course.code}
                secondLine={course.code}
              >
                {course.name}
              </ThickButton>
            )}
            <Spacing Height={"1rem"} />
          </div>
        );
      })}
    </CourseContainerDiv>
  );
};

const CourseContainerDiv = styled.div`
  min-height: 2rem;
  min-width: 2rem;
  height: 100%;
  max-height: 34.5rem;
  overflow: visible;
  overflow-y: auto;
  width: 22rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::-webkit-scrollbar {
    width: 2px;
  }
`;

export default CourseContainer;
