import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Character from "./Character.js";
import { ReactComponent as SettingsIcon } from "./Assets/settings.svg";
import { ReactComponent as TentaPIcon } from "./Assets/bookIcon3.svg";
import { useNavigate } from "react-router-dom";

const TamapluggiHeader = ({ settingsClicked }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderBackground>
        <Filler style={{ maxWidth: "2rem" }}></Filler>
        <Item
          onClick={() => {
            navigate("/");
          }}
        >
          <TentaPIcon
            width={"3rem"}
            style={{
              filter: "drop-shadow(2px 5px 2px rgb(0 0 0 / 0.2))",
              marginRight: "1rem",
            }}
          ></TentaPIcon>
          <TitleText>TentaP</TitleText>
        </Item>
        <Filler></Filler>
        <Item>
          <SettingsIcon
            onClick={settingsClicked}
            width={"3rem"}
            style={{
              color: Color.White,
              filter: "drop-shadow(2px 5px 2px rgb(0 0 0 / 0.2))",
            }}
          ></SettingsIcon>
        </Item>
        <Filler style={{ maxWidth: "2rem" }}></Filler>
      </HeaderBackground>
    </HeaderContainer>
  );
};

const Filler = styled.div`
  flex-grow: 1;
`;

const TitleText = styled.div`
  font-size: 2rem;
  font-weight: 500;
  filter: drop-shadow(2px 5px 2px rgb(0 0 0 / 0.2));
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
  &:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    transition-duration: 0.05s;
  }
  overflow: hidden;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderBackground = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: ${Color.Green};
  width: 100vw;
  height: 7rem;
  min-height: 7rem;
  position: absolute;
  left: auto;
  top: 0;
  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);

  max-width: 80rem;

  border-radius: 0 0 ${BorderRadius.Default} ${BorderRadius.Default};

  @media (max-width: 80rem) {
    left: 0;
    border-radius: 0;
  }
`;

export default TamapluggiHeader;
