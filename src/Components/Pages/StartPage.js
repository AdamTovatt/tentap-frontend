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

const StartPage = () => {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const isLoggedIn = userInfo !== undefined && userInfo != null;

  return (
    <CenterScreen>
      <StartPageMainContainer>
        <ComponentContainer>
          <StartPageHeader>
            Det borde inte kosta pengar att plugga
          </StartPageHeader>
          <Spacing Height={"1rem"} />
          <StartPageSubHeader>
            Öva på tentauppgifter som är sorterade efter svårhetsgrad och
            kursdel gratis
          </StartPageSubHeader>
          <AdvancedSpacing
            MinHeight={1.8}
            MaxHeight={4.6}
            ScreenPercentage={5}
          />
          <ThickButton>Gå till kurser</ThickButton>
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
                    Logout(cookies);
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

function Logout(cookies) {
  cookies.remove("userInfo", {
    path: "/",
    sameSite: "none",
    secure: true,
  });
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
  max-width: 32rem;

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
