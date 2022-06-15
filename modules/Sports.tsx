import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import {useRouter} from "next/router";
import Link from "next/link";
import {SelectedContext, ThemeContext} from "../components/Layout";

const Sport = styled.div`
  font-size: 1.3rem;
  cursor: pointer;
  list-style-type: none;
  color: ${props => props.color};
  padding: 4px;
  width: 100px;
  height: 30px;
  transition: 0.2s;
  text-align: center;
  
  &:hover{
    font-size: 1.4rem;
  }
  
  @media only screen and (max-width: 800px) {
    font-size: 1rem;
  }
`

const SportsDiv = styled.div`
  width: 100%;
  height: 50px;
  margin: 0 auto;
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  transition: 0.5s;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
    padding-bottom: 120px;
  }
`

function Sports() {

    const Theme = useContext(ThemeContext);
    const Selected = useContext(SelectedContext);

    const [selectedSport, setSelectedSport] = useState<string>('football');

    const [todaysDate, setTodaysDate] = useState<Date>(new Date());

    function changeSelected(sport: string) {
        Selected.sport = sport;
        setSelectedSport(Selected.sport);
    }

    return (
        <SportsDiv color={Theme.header}>
            <Link href={`/sport/football/${todaysDate.toISOString().split('T')[0]}`}><Sport onClick={() => changeSelected('football')} color={selectedSport === 'football' ? Theme.selected : 'white'}>Football</Sport></Link>
            <Link href={`/sport/tennis/${todaysDate.toISOString().split('T')[0]}`}><Sport onClick={() => changeSelected('tennis')} color={selectedSport === 'tennis' ? Theme.selected : 'white'}>Tennis</Sport></Link>
            <Link href={`/sport/basketball/${todaysDate.toISOString().split('T')[0]}`}><Sport onClick={() => changeSelected('basketball')} color={selectedSport === 'basketball' ? Theme.selected : 'white'}>Basketball</Sport></Link>
            <Link href={`/sport/ice-hockey/${todaysDate.toISOString().split('T')[0]}`}><Sport onClick={() => changeSelected('hockey')} color={selectedSport === 'hockey' ? Theme.selected : 'white'}>Hockey</Sport></Link>
            <Link href={`/sport/handball/${todaysDate.toISOString().split('T')[0]}`}><Sport onClick={() => changeSelected('handball')} color={selectedSport === 'handball' ? Theme.selected : 'white'}>Handball</Sport></Link>
            <Link href={`/sport/esports/${todaysDate.toISOString().split('T')[0]}`}><Sport onClick={() => changeSelected('esports')} color={selectedSport === 'esports' ? Theme.selected : 'white'}>Esports</Sport></Link>
            <Link href={`/sport/volleyball/${todaysDate.toISOString().split('T')[0]}`}><Sport onClick={() => changeSelected('volleyball')} color={selectedSport === 'volleyball' ? Theme.selected : 'white'}>Volleyball</Sport></Link>
            <Link href={`/sport/cricket/${todaysDate.toISOString().split('T')[0]}`}><Sport onClick={() => changeSelected('cricket')} color={selectedSport === 'cricket' ? Theme.selected : 'white'}>Cricket</Sport></Link>
            <Link href={`/sport/baseball/${todaysDate.toISOString().split('T')[0]}`}><Sport onClick={() => changeSelected('baseball')} color={selectedSport === 'baseball' ? Theme.selected : 'white'}>Baseball</Sport></Link>
        </SportsDiv>
    );
}

export default Sports;