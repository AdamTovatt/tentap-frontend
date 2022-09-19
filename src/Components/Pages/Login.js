import styled from "styled-components";
import { Color } from "../Constants";
import ThickButton from "../ThickButton.js";
import HorizontalLine from "../HorizontalLine";
import ThinButton from "../ThinButton";
import Spacing from "../Spacing";
import { Link, useNavigate } from "react-router-dom";
import CenterScreen from "../CenterScreen";
import TextField from "../TextField";
import AdvancedSpacing from "../AdvancedSpacing";
import { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Login } from "../../Api";
import { useRef } from "react";
import React, { useState } from "react";
import Cookies from "universal-cookie";

const LoginPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const cookies = new Cookies();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CenterScreen>
      <LoginPageMainContainer>
        <EmailPasswordContainer>
          <LoginPageHeader>
            Skriv in dina användaruppgifter nedanför för att logga in
          </LoginPageHeader>
          <AdvancedSpacing MinHeight={1} MaxHeight={2.6} ScreenPercentage={4} />
          <TextField
            setState={setEmail}
            title={"Email:"}
            placeHolder={"Din emailaddress..."}
          />
          <AdvancedSpacing MinHeight={0.8} MaxHeight={1} ScreenPercentage={2} />
          <TextField
            setState={setPassword}
            title={"Lösenord:"}
            placeHolder={"Ditt lösenord..."}
            type={"password"}
            onSumbit={async () => {
              await FunctionHandleLogin(email, password, cookies, navigate);
            }}
          />
          <AdvancedSpacing
            MinHeight={1}
            MaxHeight={1.75}
            ScreenPercentage={3}
          />
          <Link to="/login">
            <ThinButton
              Color={Color.Green}
              onClick={async () => {
                await FunctionHandleLogin(email, password, cookies, navigate);
              }}
            >
              Logga in
            </ThinButton>
          </Link>
          <Spacing Height={"1.2rem"} />
          <Link to="/register" style={{ textDecorationColor: Color.White }}>
            <PageText>Glömt lösenord?</PageText>
          </Link>
        </EmailPasswordContainer>
        <AdvancedSpacing MinHeight={1} MaxHeight={8.625} ScreenPercentage={4} />
        <ComponentContainer style={{ marginBottom: "3rem" }}>
          <PageText>Har du inget konto?</PageText>
          <Spacing Height={"0.6rem"} />
          <Link to="/register">
            <ThinButton Color={Color.FadedBlue} Width={"15.5rem"}>
              Registrera
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
      </LoginPageMainContainer>
    </CenterScreen>
  );
};

async function FunctionHandleLogin(email, password, cookies, navigate) {
  if (!ValidInput(email, password)) return;

  let response = await Login(email, password);

  if (response.status === 401) {
    alert("Felaktig email och/eller lösenord");
  } else if (response.status !== 200) {
    alert("Okänt fel");
  } else {
    cookies.set("userInfo", await response.json(), {
      path: "/",
      sameSite: "none",
      secure: true,
    });
    navigate("/");
  }
}

function ValidInput(email, password) {
  if (!email) return false;
  if (!password) return false;

  return true;
}

const LoginPageHeader = ({ children }) => {
  const matches = useMediaQuery("(min-height:640px)");

  return matches ? <LoginPageHeaderDiv>{children}</LoginPageHeaderDiv> : null;
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

const LoginPageHeaderDiv = styled.div`
  font-size: 1.25em;
  color: ${Color.White};
  max-width: 18rem;
  margin-top: 2rem;
`;

const LoginPageMainContainer = styled.div`
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

export default LoginPage;
