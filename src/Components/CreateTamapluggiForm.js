import styled from "styled-components";
import { Color } from "./Constants";
import ThinButton from "./ThinButton";
import Spacing from "./Spacing";
import { Link, useNavigate } from "react-router-dom";
import AdvancedSpacing from "./AdvancedSpacing";
import Cookies from "universal-cookie";
import { useState } from "react";
import TextField from "./TextField";
import DialogBox from "./DialogBox";
import { useEffect } from "react";
import { CreateTamapluggi } from "../Api";

const CreateTamapluggiForm = ({ tamapluggiWasCreated }) => {
  const [dialogText, setDialogText] = useState(null);
  const [tamaPluggiName, setTamapluggiName] = useState(null);
  const [pauseDuration, setPauseDuration] = useState(null);
  const [studyGoal, setStudyGoal] = useState(null);
  const [createButton, setCreateButton] = useState(null);

  useEffect(() => {
    setCreateButton(document.getElementById("createButton"));
  }, [createButton]);

  return (
    <>
      {!dialogText ? null : (
        <DialogBox
          text={dialogText}
          setDialogText={setDialogText}
          onClose={() => {}}
        />
      )}
      <CreateTamapluggiContainer>
        <TextField
          setState={setStudyGoal}
          title={"Pluggmål per dag (minuter):"}
          placeHolder={"Antal minuter per dag"}
          onSumbit={async () => {
            await createButton.click();
          }}
        />
        <Spacing Height={"1rem"} />
        <TextField
          setState={setPauseDuration}
          title={"Längd på paus (minuter):"}
          placeHolder={"Din föredragna längd på pluggpauser"}
          onSumbit={async () => {
            await createButton.click();
          }}
        />
        <Spacing Height={"1rem"} />
        <TextField
          setState={setTamapluggiName}
          title={"Namn:"}
          placeHolder={"Namn på din tamapluggi"}
          onSumbit={async () => {
            await createButton.click();
          }}
        />
        <Spacing Height={"2rem"} />
        <ThinButton
          Color={Color.Green}
          TextColor={Color.Dark}
          id={"createButton"}
          onClick={() => {
            HandleCreate(
              tamaPluggiName,
              studyGoal,
              pauseDuration,
              setDialogText,
              tamapluggiWasCreated
            );
          }}
        >
          Skapa tamapluggi
        </ThinButton>
      </CreateTamapluggiContainer>
    </>
  );
};

async function HandleCreate(
  tamaPluggiName,
  studyGoal,
  pauseDuration,
  setDialogText,
  tamapluggiWasCreated
) {
  if (!tamaPluggiName) {
    setDialogText("Du behöver välja ett namn på din tamapluggi!");
    return;
  }
  if (!studyGoal) {
    setDialogText(
      "Du behöver välja ett mål för hur många minuter per dag du vill plugga"
    );
    return;
  }
  if (!isNumeric(studyGoal)) {
    setDialogText("Ditt mål för pluggande måste vara ett heltal");
    return;
  }
  if (!pauseDuration) {
    setDialogText(
      "Du måste ange en önskad längd på eventuella pauser i ditt pluggande"
    );
    return;
  }
  if (!isNumeric(pauseDuration)) {
    setDialogText("Längden på dina pauser måste vara ett heltal");
    return;
  }
  let pause = parseInt(pauseDuration);
  let goal = parseInt(pauseDuration);

  if (pause < 0 || goal < 0) {
    setDialogText(
      "Du kan tyvärr inte ha negativ tid, välj en positiv tid istället"
    );
    return;
  }

  let response = await CreateTamapluggi(tamaPluggiName, goal, pause);

  if (response.status === 200) {
    tamapluggiWasCreated();
  } else {
    setDialogText("Ett fel inträffade när din tamapluggi skulle skapas");
  }
}

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseInt(str));
}

const CreateTamapluggiContainer = styled.div``;

const ComponentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  justify-content: space-around;
`;

export default CreateTamapluggiForm;
