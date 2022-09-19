import styled from "styled-components";
import { Color } from "../Constants";
import ThinButton from "../ThinButton";
import Spacing from "../Spacing";
import { Link } from "react-router-dom";
import CenterScreen from "../CenterScreen";
import TextField from "../TextField";
import AdvancedSpacing from "../AdvancedSpacing";
import { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const RegisterPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CenterScreen>
      <RegisterPageMainContainer>
        <EmailPasswordContainer>
          <RegisterPageHeader>
            Välj dina användaruppgifter för att registera ett konto
          </RegisterPageHeader>
          <AdvancedSpacing MinHeight={1} MaxHeight={2.6} ScreenPercentage={4} />
          <TextField
            title={"Användarnamn:"}
            placeHolder={"Kan ändras senare..."}
          />
          <AdvancedSpacing MinHeight={0.8} MaxHeight={1} ScreenPercentage={2} />
          <TextField title={"Email:"} placeHolder={"Din emailaddress..."} />
          <AdvancedSpacing MinHeight={0.8} MaxHeight={1} ScreenPercentage={2} />
          <TextField
            title={"Lösenord:"}
            placeHolder={"Ditt lösenord..."}
            type={"password"}
          />
          <AdvancedSpacing
            MinHeight={1}
            MaxHeight={1.75}
            ScreenPercentage={3}
          />
          <Link to="/login">
            <ThinButton Color={Color.Green}>Skapa konto</ThinButton>
          </Link>
          <Spacing Height={"1.2rem"} />
        </EmailPasswordContainer>
        <AdvancedSpacing MinHeight={1} MaxHeight={8.625} ScreenPercentage={4} />
        <ComponentContainer style={{ marginBottom: "3rem" }}>
          <PageText>Har du redan ett konto?</PageText>
          <Spacing Height={"0.6rem"} />
          <Link to="/login">
            <ThinButton Color={Color.FadedBlue} Width={"15.5rem"}>
              Logga in
            </ThinButton>
          </Link>
          <Spacing Height={"1rem"} />
          <Link to="/">
            <ThinButton
              Color={Color.Red}
              TextColor={Color.Dark}
              Width={"15.5rem"}
            >
              Tillbaka
            </ThinButton>
          </Link>
        </ComponentContainer>
      </RegisterPageMainContainer>
    </CenterScreen>
  );
};

const RegisterPageHeader = ({ children }) => {
  const matches = useMediaQuery("(min-height:700px)");

  return matches ? (
    <RegisterPageHeaderDiv>{children}</RegisterPageHeaderDiv>
  ) : null;
};

const ComponentContainer = styled.div``;

const EmailPasswordContainer = styled.div`
  margin-top: 1rem;
`;

const PageText = styled.div`
  font-size: 0.9em;
  color: ${Color.White};
  text-decoration-color: ${Color.White};
  -webkit-text-decoration-color: red;
`;

const RegisterPageHeaderDiv = styled.div`
  font-size: 1.25em;
  color: ${Color.White};
  max-width: 18rem;
  margin-top: 2rem;
`;

const RegisterPageMainContainer = styled.div`
  height: 100vh;
  max-height: 812px;
  font-size: 1em;
  font-family: "Jost";
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
`;

export default RegisterPage;
