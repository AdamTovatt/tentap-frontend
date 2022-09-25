import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";
import { useEffect, useState } from "react";

const DifficultySelection = ({
  width,
  onChangedDifficultySetting,
  allowMultipleSettings,
  defaultSetting,
}) => {
  const [difficultySettings, setDifficultySettings] = useState(
    defaultSetting ? defaultSetting : [false, false, false]
  );

  console.log(defaultSetting);
  useEffect(() => {}, [difficultySettings]);

  return (
    <DifficultySelectionDiv width={width}>
      <DifficultySelectionPart
        color={Color.Green}
        topLeft={true}
        bottomLeft={true}
        onClick={() => {
          HandleDifficultyToggle(
            allowMultipleSettings,
            0,
            setDifficultySettings,
            difficultySettings,
            onChangedDifficultySetting
          );
        }}
        useBorder={difficultySettings[0]}
      >
        Lätt
      </DifficultySelectionPart>
      <DifficultySelectionPart
        color={Color.Yellow}
        onClick={() => {
          HandleDifficultyToggle(
            allowMultipleSettings,
            1,
            setDifficultySettings,
            difficultySettings,
            onChangedDifficultySetting
          );
        }}
        useBorder={difficultySettings[1]}
      >
        Medel
      </DifficultySelectionPart>
      <DifficultySelectionPart
        color={Color.Red}
        topRight={true}
        bottomRight={true}
        onClick={() => {
          HandleDifficultyToggle(
            allowMultipleSettings,
            2,
            setDifficultySettings,
            difficultySettings,
            onChangedDifficultySetting
          );
        }}
        useBorder={difficultySettings[2]}
      >
        Svår
      </DifficultySelectionPart>
    </DifficultySelectionDiv>
  );
};

function HandleDifficultyToggle(
  allowMultipleSettings,
  index,
  setDifficultySettings,
  difficultySettings,
  onChangedDifficultySetting
) {
  let newDifficultySettings = [...difficultySettings];

  for (let i = 0; i < newDifficultySettings.length; i++) {
    if (i === index) {
      newDifficultySettings[i] = !newDifficultySettings[i];
    } else {
      if (!allowMultipleSettings && !difficultySettings[index]) {
        //we dont allow multiple settings and one will be activated, deactivate the others
        newDifficultySettings[i] = false;
      }
    }
  }

  setDifficultySettings(newDifficultySettings);
  onChangedDifficultySetting(newDifficultySettings);
}

const DifficultySelectionPart = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  font-size: 1em;
  font-family: "Jost";
  max-height: 5.25rem;
  height: 5.25rem;
  width: 100%;

  border-top-left-radius: ${(props) =>
    props.topLeft ? BorderRadius.Default : 0};
  border-top-right-radius: ${(props) =>
    props.topRight ? BorderRadius.Default : 0};
  border-bottom-left-radius: ${(props) =>
    props.bottomLeft ? BorderRadius.Default : 0};
  border-bottom-right-radius: ${(props) =>
    props.bottomRight ? BorderRadius.Default : 0};

  border: 4px solid ${Color.White};
  border-width: ${(props) => (props.useBorder ? "4px" : "0px")};
  color: ${Color.Dark};
  text-decoration: none;

  cursor: pointer;

  &:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    transition-duration: 0.05s;
  }
`;

const DifficultySelectionDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${Color.Blue};
  font-size: 1em;
  font-family: "Jost";
  max-height: 5.25rem;
  height: 5.25rem;
  width: ${(props) => (props.width ? props.width + "rem" : "18rem")};
  border-radius: ${BorderRadius.Default};
  border: none;
  color: ${(props) => (props.TextColor ? props.TextColor : Color.White)};
  text-decoration: none;

  cursor: pointer;

  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default DifficultySelection;
