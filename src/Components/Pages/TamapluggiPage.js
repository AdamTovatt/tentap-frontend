import styled from "styled-components";
import { Color } from "../Constants";
import ThickButton from "../ThickButton.js";
import HorizontalLine from "../HorizontalLine";
import ThinButton from "../ThinButton";
import Spacing from "../Spacing";
import { Link } from "react-router-dom";
import CenterScreen from "../CenterScreen";
import AdvancedSpacing from "../AdvancedSpacing";
import Cookies from "universal-cookie";
import { RemoveUserInfo } from "../../UserInfoHelper";
import { useState } from "react";
import DialogBox from "../DialogBox";
import { useEffect } from "react";
import { setCookie } from "../../Functions";
import TamapluggiScreen from "../Tamapluggi/TamapluggiScreen";

const TamapluggiPage = () => {
  const [dialogText, setDialogText] = useState(null);

  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const isLoggedIn = userInfo !== undefined && userInfo != null;

  useEffect(() => {}, []);

  return (
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
        <ComponentContainer>
          <TamapluggiScreen></TamapluggiScreen>
        </ComponentContainer>
      </MainContainer>
    </CenterScreen>
  );
};

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

  @media (min-width: 640px) {
    text-align: center;
  }
`;

export default TamapluggiPage;
