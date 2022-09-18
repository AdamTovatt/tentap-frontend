import styled from "styled-components";
import { Color } from "../Constants";
import ThickButton from "../ThickButton.js";
import HorizontalLine from "../HorizontalLine";
import ThinButton from "../ThinButton";
import Spacing from "../Spacing";
import { Link } from "react-router-dom";
import CenterScreen from "../CenterScreen";
import TextField from "../TextField";
import WhiteLink from "../WhiteLink";

const LoginPage = () => {
  return (
    <CenterScreen>
      <LoginPageMainContainer>
        <LoginPageHeader>
          Skriv in dina användaruppgifter nedanför för att logga in
        </LoginPageHeader>
        <TextField title={"Email:"} placeHolder={"Din emailaddress..."} />
        <Spacing Height={"1rem"} />
        <TextField
          title={"Lösenord:"}
          placeHolder={"Ditt lösenord..."}
          type={"password"}
        />
        <Spacing Height={"1.75rem"} />
        <Link to="/login">
          <ThinButton Color={Color.Green}>Logga in</ThinButton>
        </Link>
        <Spacing Height={"1.2rem"} />
        <Link to="/register" style={{ textDecorationColor: Color.White }}>
          <PageText>Glömt lösenord?</PageText>
        </Link>
        <Spacing Height={"8.625rem"} />
        <PageText>Har du inget konto?</PageText>
        <Spacing Height={"0.6rem"} />
        <Link to="/register">
          <ThinButton>Registrera</ThinButton>
        </Link>
        <Spacing Height={"1rem"} />
        <Link to="/">
          <ThinButton Color={Color.Red} TextColor={Color.Dark}>
            Tillbaka
          </ThinButton>
        </Link>
      </LoginPageMainContainer>
    </CenterScreen>
  );
};

const PageText = styled.div`
  font-size: 1.15em;
  color: ${Color.White};
  text-decoration-color: ${Color.White};
  -webkit-text-decoration-color: red;
`;

const LoginPageHeader = styled.div`
  font-size: 1.25em;
  color: ${Color.White};
  max-width: 18rem;
  min-height: 6rem;
`;

const LoginPageMainContainer = styled.div`
  font-size: 1em;
  font-family: "Jost";
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 2.8rem;
  margin-bottom: 2.8rem;
`;

export default LoginPage;
