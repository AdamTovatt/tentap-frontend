import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Character from "./Character.js";
import { ReactComponent as HouseIcon } from "./Assets/home.svg";
import { ReactComponent as Clock } from "./Assets/study.svg";
import { ReactComponent as Cards } from "./Assets/flashcards.svg";
import { ReactComponent as Planning } from "./Assets/planning.svg";
import { ReactComponent as Statistics } from "./Assets/statistics.svg";

const TamapluggiFooter = () => {
  return (
    <HeaderContainer>
      <HeaderBackground>
        <Filler></Filler>
        <ItemContainer>
          <Item>
            <HouseIcon
              cursor={"pointer"}
              width={"3rem"}
              style={{
                color: Color.White,
                filter: "drop-shadow(2px 5px 2px rgb(0 0 0 / 0.2))",
              }}
            ></HouseIcon>
          </Item>
          <Item>
            <Clock
              cursor={"pointer"}
              width={"3rem"}
              style={{
                color: Color.White,
                filter: "drop-shadow(2px 5px 2px rgb(0 0 0 / 0.2))",
              }}
            ></Clock>
          </Item>
          <Item>
            <Cards
              cursor={"pointer"}
              width={"3rem"}
              style={{
                color: Color.White,
                filter: "drop-shadow(2px 5px 2px rgb(0 0 0 / 0.2))",
              }}
            ></Cards>
          </Item>
          <Item>
            <Planning
              cursor={"pointer"}
              width={"3rem"}
              style={{
                color: Color.White,
                filter: "drop-shadow(2px 5px 2px rgb(0 0 0 / 0.2))",
              }}
            ></Planning>
          </Item>
          <Item>
            <Statistics
              cursor={"pointer"}
              width={"3rem"}
              style={{
                color: Color.White,
                filter: "drop-shadow(2px 5px 2px rgb(0 0 0 / 0.2))",
              }}
            ></Statistics>
          </Item>
        </ItemContainer>
        <Filler></Filler>
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
  cursor: pointer;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  max-height: 6rem;
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
  flex-direction: column;
  background-color: ${Color.Green};
  width: 100vw;
  height: 7rem;
  min-height: 7rem;
  position: absolute;
  left: auto;
  bottom: 0;
  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);

  max-width: 80rem;

  border-radius: ${BorderRadius.Default} ${BorderRadius.Default} 0 0;

  @media (max-width: 80rem) {
    left: 0;
    border-radius: 0;
  }
`;

export default TamapluggiFooter;
