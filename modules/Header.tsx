import React, {useContext} from 'react';
import styled from "styled-components";
import Sports from "./Sports";
import {ThemeContext} from "../components/Layout";

const Background = styled.div`
  width: 100%;
  background-color: ${props => props.color};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
`

const Title = styled.h1`
  color: white;
  font-size: 80px;
  width: 50%;
  transition: 0.5s;
  @media only screen and (max-width: 600px) {
    font-size: 50px;
  }
`

function Header() {

    const Theme = useContext(ThemeContext);

    return (
        <Background color={Theme.header}>
            <Title>MiniSofa</Title>
            <Sports />
        </Background>
    );
}

export default Header;