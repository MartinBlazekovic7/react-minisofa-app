import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {FavouriteContext, ThemeContext} from "../components/Layout";
import {API_BASENAME} from "../util/ApiName";
import SWRConfig from "swr/dist/utils/config-context";
import Link from "next/link";
import {EventInfo} from "../model/Event";
import {TourneyName} from "./CategoryRow";

const Title = styled.h2`
  text-align: center;
  color: ${props => props.color};
  transition: 0.5s;
`
const FavouritesDiv = styled.div`
  width: 100%;
  min-height: 100vh;
`

const Logo = styled.img`
  width: 25px;
  margin: 0 5px;
`

const Team = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 30%;
`

const Score = styled.div`
    display: flex;
  width: 30%;
  justify-content: flex-end;
  margin-right: 25px;
`

const EventDiv = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 0.1px solid gray;
  cursor: pointer;
  width: 90%;
  transition: 0.5s;
  &:hover{
    background-color: darkgray;
  }
  
`

const TeamName = styled.p`
  font-size: 14px;
  color: ${props => props.color};
  transition: 0.5s;
`

const TourName = styled.p`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  font-size: 12px;
  width: 40%;
  margin-left: 25px;
  color: ${props => props.color};
  transition: 0.5s;
`

interface EventContext {
    favs: EventInfo[];
}

const FavRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
`

const RemoveButton = styled.button`
  width: 10%;
  height: 80%;
  background: ${props => props.theme.header};
  color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.header};
  border-radius: 5px;
  transition: 0.2s;
  margin: 0 5px;
  cursor: pointer;
  &:hover{
    padding: 2px;
  }
  
`
function Favourites() {

    const Theme = useContext(ThemeContext);

    const {favs} = useContext<EventContext>(FavouriteContext);

    useEffect(() => {
        console.log(favs);
    }, [favs])

    return (
        <FavouritesDiv>
            <Title color={Theme.text}>Favourites</Title>
            {favs.map((favourite) => (
                <FavRow key={favourite.id}>


                    <Link href={`/event/${favourite.slug}/${favourite.id}`}><EventDiv>
                        <TourName color={Theme.secondText}>{favourite.tournament.name}</TourName>
                        <Team>
                            <Logo src={API_BASENAME + `team/${favourite.homeTeam.id}/image`}/>
                            <TeamName color={Theme.secondText}>vs</TeamName>
                            <Logo src={API_BASENAME + `team/${favourite.awayTeam.id}/image`}/>
                        </Team>
                        <Score>
                            {(favourite.winnerCode === 0 || typeof favourite.winnerCode === 'undefined') &&
                                <TeamName color={Theme.secondText}>{new Date(favourite.startTimestamp * 1000).getHours().toString()}:{(new Date(favourite.startTimestamp * 1000).getMinutes().toString() === '0' && new Date(favourite.startTimestamp * 1000).getMinutes().toString()+'0') || (new Date(favourite.startTimestamp * 1000).getMinutes().toString())}</TeamName>}
                            {favourite.winnerCode === 1 &&
                                <TeamName color={Theme.secondText}><strong>{favourite.homeScore.display}</strong>:{favourite.awayScore.display}
                                </TeamName>}
                            {favourite.winnerCode === 2 &&
                                <TeamName color={Theme.secondText}>{favourite.homeScore.display}:<strong>{favourite.awayScore.display}</strong></TeamName>}
                            {favourite.winnerCode === 3 &&
                                <TeamName color={Theme.secondText}>{favourite.homeScore.display}:{favourite.awayScore.display}</TeamName>}
                        </Score>
                    </EventDiv></Link>
                    <RemoveButton theme={Theme} onClick={() => favs.splice(favs.indexOf(favourite), 1)}>Remove</RemoveButton>
                </FavRow>

            ))}
        </FavouritesDiv>
    );
}

export default Favourites;