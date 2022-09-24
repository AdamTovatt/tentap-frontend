import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";
import Spacing from "./Spacing";
import ThickButton from "./ThickButton";

const ModuleContainer = ({
  modules,
  moduleSelected,
  createModule,
  width,
  maxHeight,
}) => {
  if (!moduleSelected)
    console.error(
      "ModuleContainer should have moduleSelected property as a function!!"
    );

  const displayModules = [...modules];

  if (createModule)
    displayModules.push({ id: -1, name: "Skapa ny", code: "+" });

  return (
    <ModuleContainerDiv maxHeight={maxHeight}>
      {displayModules.map((course) => {
        return (
          <div key={course.id}>
            {course.id !== -1 ? (
              <ThickButton
                width={width}
                onClick={() => {
                  moduleSelected(course.id);
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
                  createModule();
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
    </ModuleContainerDiv>
  );
};

const ModuleContainerDiv = styled.div`
  min-height: 2rem;
  min-width: 2rem;
  height: 100%;
  max-height: ${(props) => props.maxHeight + "rem"};
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

export default ModuleContainer;
