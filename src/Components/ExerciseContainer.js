import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";
import Spacing from "./Spacing";
import ThickButton from "./ThickButton";

const ExerciseContainer = ({
  exercises,
  exerciseSelected,
  createExercise,
  width,
  height,
}) => {
  if (!exerciseSelected)
    console.error(
      "Exercise container should have exerciseSelected property as a function!!"
    );

  const displayExercises = [...exercises];

  if (createExercise) displayExercises.push({ id: -1 });

  return (
    <ExerciseContainerDiv maxHeight={height}>
      {displayExercises.map((exercise) => {
        return (
          <div key={exercise.id}>
            {exercise.id !== -1 ? (
              <ThickButton
                Color={Color.Blue}
                TextColor={Color.White}
                width={width}
                onClick={() => {
                  exerciseSelected(exercise.id);
                }}
                key={exercise.id}
                secondLine={
                  "#" + exercise.id + " " + exercise.source.date.split("T")[0]
                }
              >
                {exercise.source.author}
              </ThickButton>
            ) : (
              <ThickButton
                width={width}
                Color={Color.Cyan}
                TextColor={Color.Dark}
                onClick={() => {
                  createExercise();
                }}
                key={exercise.id}
                secondLine={"+"}
              >
                Skapa ny
              </ThickButton>
            )}
            <Spacing Height={"1rem"} />
          </div>
        );
      })}
    </ExerciseContainerDiv>
  );
};

const ExerciseContainerDiv = styled.div`
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

export default ExerciseContainer;
