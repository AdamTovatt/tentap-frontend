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
import { RemoveUserInfo } from "../../UserInfoHelper";
import { useState } from "react";
import DialogBox from "../DialogBox";
import { useEffect } from "react";
import { setCookie } from "../../Functions";
import TamapluggiScreen from "../Tamapluggi/TamapluggiScreen";
import { GetTamapluggiForUser } from "../../Api";
import TextField from "../TextField";
import CreateTamapluggiForm from "../CreateTamapluggiForm";
import { PulseLoader as Loader } from "react-spinners";
import TamapluggiHeader from "../Tamapluggi/TamapluggiHeader";
import TamapluggiFooter from "../Tamapluggi/TamapluggiFooter";
import SettingsScreen from "../Tamapluggi/SettingsScreen";

const TamapluggiPage = () => {
  const [dialogText, setDialogText] = useState(null);
  const [tamapluggi, setTamapluggi] = useState(null);
  const [failed, setFailed] = useState(false);
  const [fetchedTamapluggi, setFetchedTamapluggi] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const cookies = new Cookies();
  const navigate = useNavigate();

  const userInfo = cookies.get("userInfo");
  const isLoggedIn = userInfo !== undefined && userInfo != null;

  useEffect(() => {
    async function FetchTamapluggi() {
      let response = await GetTamapluggiForUser();
      console.log(response);
      if (response.status === 200) {
        let json = await response.json();
        console.log(json);
        setTamapluggi(json);
      } else setFailed(true);

      setFetchedTamapluggi(true);
    }

    if (!isLoggedIn) {
      navigate("/");
    } else {
      if (!fetchedTamapluggi) {
        FetchTamapluggi();
      }
    }
  }, [navigate, isLoggedIn, tamapluggi, failed, fetchedTamapluggi]);

  return (
    <>
      <TamapluggiHeader
        settingsClicked={() => {
          setSettingsOpen(true);
        }}
      ></TamapluggiHeader>
      <CenterScreen>
        {!dialogText ? null : (
          <DialogBox
            text={dialogText}
            setDialogText={setDialogText}
            onClose={() => {
              setCookie("hasSeenDisclaimer", true);
            }}
          />
        )}
        <MainContainer>
          <>
            {fetchedTamapluggi ? (
              <>
                {tamapluggi ? (
                  <ComponentContainer>
                    <TamapluggiScreen></TamapluggiScreen>
                  </ComponentContainer>
                ) : (
                  <ComponentContainer>
                    <CreateTamapluggiForm
                      tamapluggiWasCreated={() => {
                        setFetchedTamapluggi(false);
                      }}
                    />
                  </ComponentContainer>
                )}
              </>
            ) : (
              <ComponentContainer>
                <Loader color={Color.Blue} />
              </ComponentContainer>
            )}
          </>
          {settingsOpen ? <SettingsScreen></SettingsScreen> : null}
        </MainContainer>
      </CenterScreen>
      <TamapluggiFooter></TamapluggiFooter>
    </>
  );
};

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

export default TamapluggiPage;
