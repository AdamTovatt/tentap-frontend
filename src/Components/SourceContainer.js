import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";
import Spacing from "./Spacing";
import ThickButton from "./ThickButton";

const SourceContainer = ({
  sources,
  sourceSelected,
  createSource,
  width,
  height,
}) => {
  if (!sourceSelected)
    console.error(
      "Source container should have sourceSelected property as a function!!"
    );

  const displayCourses = [...sources];

  if (createSource)
    displayCourses.push({ id: -1, author: "Skapa ny", date: "+" });

  return (
    <SourceContainerDiv maxHeight={height}>
      {displayCourses.map((course) => {
        return (
          <div key={course.id}>
            {course.id !== -1 ? (
              <ThickButton
                Color={Color.Blue}
                TextColor={Color.White}
                width={width}
                onClick={() => {
                  sourceSelected(course.id);
                }}
                key={course.id}
                secondLine={course.date.split("T")[0]}
              >
                {course.author}
              </ThickButton>
            ) : (
              <ThickButton
                width={width}
                Color={Color.Cyan}
                TextColor={Color.Dark}
                onClick={() => {
                  createSource();
                }}
                key={course.id}
                secondLine={course.date}
              >
                {course.author}
              </ThickButton>
            )}
            <Spacing Height={"1rem"} />
          </div>
        );
      })}
    </SourceContainerDiv>
  );
};

const SourceContainerDiv = styled.div`
  min-height: 2rem;
  min-width: 2rem;
  height: 100%;
  max-height: ${(props) =>
    props.maxHeight ? props.maxHeight + "rem" : "40rem"};
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

export default SourceContainer;
