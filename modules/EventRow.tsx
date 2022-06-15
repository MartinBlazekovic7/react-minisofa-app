import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {EventInfo} from "../model/Event";
import Link from "next/link"
import {FavouriteContext, SelectedContext, ThemeContext} from "../components/Layout";

export const EventRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.color};
  margin: 0 20px;
  height: 30px;
  transition: 0.5s;
`

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 30%;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 10%;
`
const Middle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
  
  > p {
    cursor: pointer;
  }
  > p:hover{
    text-decoration: underline;
  }
`

const TeamName = styled.p`
  font-size: 14px;
  color: ${props => props.color};
  transition: 0.5s;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`

interface Props {
    eventInfo: EventInfo;
}

interface StartTime {
    hours: Number;
    minutes: Number;
}

export interface EventContext {
    favs: EventInfo[];
}

export const FavButton = styled.button`
  background: transparent;
  border: none;
  transition: 0.5s;
  outline: 1px solid ${props => props.theme.text};
  color: ${props => props.theme.text};
  margin-top: 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    outline: 1px solid ${props => props.theme.header};
    color: ${props => props.theme.header};
  }
`



function EventRow({eventInfo}: Props) {

    const [favToggle, setFavToggle] = useState<Boolean>(false);

    const Theme = useContext(ThemeContext);

    let d = new Date(eventInfo.startTimestamp * 1000);
    let h = d.getHours();
    let m:string = d.getMinutes().toString();
    if(m === '0') m = m + '0';


    const {favs} = useContext<EventContext>(FavouriteContext);

    const Selected = useContext(SelectedContext);

    function addFavs(){
        setFavToggle(!favToggle);
        favs.push(eventInfo);
    }

    return (
        <>
        {new Date(eventInfo.startTimestamp*1000).toDateString() === Selected.date.toDateString() &&

        <EventRowDiv color={Theme.border}>
            <Left>
                {!favToggle &&<FavButton theme={Theme} onClick={() => addFavs()}>Favourite</FavButton>}
            </Left>
            <Middle>
                {eventInfo.winnerCode === 1 && <Link href={`/event/${eventInfo.slug}/${eventInfo.id}`}><TeamName color={Theme.secondText}><strong>{eventInfo.homeTeam.name}</strong> - {eventInfo.awayTeam.name}</TeamName></Link>}
                {eventInfo.winnerCode === 2 && <Link href={`/event/${eventInfo.slug}/${eventInfo.id}`}><TeamName color={Theme.secondText}>{eventInfo.homeTeam.name} - <strong>{eventInfo.awayTeam.name}</strong></TeamName></Link>}
                {(eventInfo.winnerCode === 0 || eventInfo.winnerCode === 3 || typeof eventInfo.winnerCode === 'undefined') && <Link href={`/event/${eventInfo.slug}/${eventInfo.id}`}><TeamName color={Theme.secondText}>{eventInfo.homeTeam.name} - {eventInfo.awayTeam.name}</TeamName></Link>}
            </Middle>
            <Right>
                {(eventInfo.winnerCode === 0 || typeof eventInfo.winnerCode === 'undefined') && <TeamName color={Theme.secondText}>{h}:{m}</TeamName>}
                {eventInfo.winnerCode === 1 && <TeamName color={Theme.secondText}><strong>{eventInfo.homeScore.display}</strong>:{eventInfo.awayScore.display}</TeamName>}
                {eventInfo.winnerCode === 2 && <TeamName color={Theme.secondText}>{eventInfo.homeScore.display}:<strong>{eventInfo.awayScore.display}</strong></TeamName>}
                {eventInfo.winnerCode === 3 && <TeamName color={Theme.secondText}>{eventInfo.homeScore.display}:{eventInfo.awayScore.display}</TeamName>}
            </Right>
        </EventRowDiv>
        }</>

    );
}

export default EventRow;