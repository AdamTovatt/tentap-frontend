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
import { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const UserProfilePage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const userInfo = cookies.get("userInfo");
  const isLoggedIn = userInfo !== undefined && userInfo != null;

  let userRole = 0;
  if (isLoggedIn) {
    userRole = userInfo.role;
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  return (
    <CenterScreen>
      <MainContainer>
        <ComponentContainer>
          <Header>Välkommen till din profilsida!</Header>
          <Spacing Height={"1rem"} />
          <SubHeader>
            Ditt registrerade namn är {userInfo.name}, som om du inte redan
            visste det.
          </SubHeader>
          <AdvancedSpacing
            MinHeight={0.5}
            MaxHeight={4.6}
            ScreenPercentage={2}
          />
          {useMediaQuery("(min-height:530px)") ? (
            <SubHeader>
              Din registrerade emailadress är {userInfo.email}
            </SubHeader>
          ) : null}
          <AdvancedSpacing
            MinHeight={0.5}
            MaxHeight={4.6}
            ScreenPercentage={2}
          />
          {useMediaQuery("(min-height:640px)") ? (
            <SubHeader>
              Endast en hash av ditt lösenord finns sparat så det går tyvärr
              inte att få reda på vad det är
            </SubHeader>
          ) : null}
        </ComponentContainer>
        <ComponentContainer>
          {userRole > 0 ? (
            <>
              <Link style={{ textDecoration: "none" }} to={"/admin"}>
                <ThickButton>Administrera kurser</ThickButton>
              </Link>
              <AdvancedSpacing
                MinHeight={0.5}
                MaxHeight={4.6}
                ScreenPercentage={2}
              />
            </>
          ) : null}

          <Link to={"/"}>
            <ThinButton Color={Color.Red} TextColor={Color.Dark}>
              Tillbaka
            </ThinButton>
          </Link>
          <Spacing Height={"2rem"} />
        </ComponentContainer>
      </MainContainer>
    </CenterScreen>
  );
};

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 2em;
  color: ${Color.White};
  max-width: 33rem;
  min-height: 3.5rem;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    max-width: 18rem;
  }
`;

const SubHeader = styled.div`
  font-size: 1.25em;
  color: ${Color.White};
  max-width: 32rem;

  @media (max-width: 640px) {
    max-width: 18rem;
  }
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

export default UserProfilePage;
