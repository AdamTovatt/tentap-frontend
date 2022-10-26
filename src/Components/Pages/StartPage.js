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

const StartPage = () => {
  const [dialogText, setDialogText] = useState(null);

  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const hasSeemDisclaimer = cookies.get("hasSeenDisclaimer");
  const isLoggedIn = userInfo !== undefined && userInfo != null;

  useEffect(() => {
    if (!hasSeemDisclaimer)
      setDialogText(
        "Hej, kul att du hittat hit! Den här sidan är långt ifrån klar och saknar många funktioner och mycket innehåll. Det tar rätt lång tid att skriva allt, har hitills skrivit runt 6000 rader kod för sidan men det är många rader kvar 😩. Du får gärna använda den ändå men tänkte bara säga det, så du vet"
      );
  }, [hasSeemDisclaimer]);

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
      <StartPageMainContainer>
        <ComponentContainer>
          <StartPageHeader>Det borde inte vara dyrt att plugga</StartPageHeader>
          <Spacing Height={"1rem"} />
          <StartPageSubHeader>
            Öva på tentauppgifter som är sorterade efter svårhetsgrad och
            kursdel för 0kr
          </StartPageSubHeader>
          <AdvancedSpacing
            MinHeight={1.8}
            MaxHeight={4.6}
            ScreenPercentage={5}
          />
          <Link style={{ textDecoration: "none" }} to={"/courses"}>
            <ThickButton>Gå till kurser</ThickButton>
          </Link>
        </ComponentContainer>
        <ComponentContainer>
          <AdvancedSpacing
            MinHeight={0.5}
            MaxHeight={1.8}
            ScreenPercentage={2}
          />
          <HorizontalLine />
          <AdvancedSpacing
            MinHeight={0.5}
            MaxHeight={1.8}
            ScreenPercentage={2}
          />
          {isLoggedIn ? (
            <>
              <Link to="/me">
                <ThinButton Color={Color.FadedBlue} Width={"15.5rem"}>
                  Min sida
                </ThinButton>
              </Link>
              <Spacing Height={"1rem"} />
              <Link to="/">
                <ThinButton
                  onClick={() => {
                    Logout();
                  }}
                  Color={Color.FadedBlue}
                  Width={"15.5rem"}
                >
                  Logga ut
                </ThinButton>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <ThinButton Color={Color.FadedBlue} Width={"15.5rem"}>
                  Logga in
                </ThinButton>
              </Link>
              <Spacing Height={"1rem"} />
              <Link to="/register">
                <ThinButton Color={Color.FadedBlue} Width={"15.5rem"}>
                  Registrera
                </ThinButton>
              </Link>
            </>
          )}
          <AdvancedSpacing
            MinHeight={0.5}
            MaxHeight={1.8}
            ScreenPercentage={2}
          />
          <HorizontalLine />
          <AdvancedSpacing
            MinHeight={0.5}
            MaxHeight={1.8}
            ScreenPercentage={2}
          />
        </ComponentContainer>
        <ComponentContainer>
          <ThinButton Color={Color.Green} Width={"17rem"}>
            Mer information
          </ThinButton>
          <Spacing Height={"2rem"} />
        </ComponentContainer>
      </StartPageMainContainer>
    </CenterScreen>
  );
};

function Logout() {
  RemoveUserInfo();
  window.location.reload();
}

const ComponentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StartPageHeader = styled.div`
  font-size: 2em;
  color: ${Color.White};
  max-width: 33rem;
  min-height: 3.5rem;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    max-width: 18rem;
  }
`;

const StartPageSubHeader = styled.div`
  font-size: 1.25em;
  color: ${Color.White};
  max-width: 30rem;

  @media (max-width: 640px) {
    max-width: 18rem;
  }
`;

const StartPageMainContainer = styled.div`
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

export default StartPage;
