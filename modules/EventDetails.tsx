import React, {useContext, useState} from 'react';
import {EventInfo, UniqueTournament} from "../model/Event";
import {useRouter} from "next/router";
import styled from "styled-components";
import {API_BASENAME} from "../util/ApiName";
import {Statistics} from "../model/Statistics";
import {FavouriteContext, SelectedContext, ThemeContext} from "../components/Layout";
import {EventContext, FavButton} from "./EventRow";

interface Props {
    eventInfo: EventInfo;
    statistics: Statistics;
    uniqueTournament?: UniqueTournament;
}

const EventDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`

const Text = styled.h1`
  color: ${props => props.color};
  text-align: center;
  height: 30%;
  font-size: 22px;
`

const Stats = styled.h1`
  color: ${props => props.color};
  text-align: center;
  font-size: 14px;
`

const Category = styled.h3`
  color: ${props => props.color};
  text-align: center;
  font-size: 14px;
`

const Score = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const StatDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 0.1px solid ${props => props.color};
  transition: 0.5s;
`

const Home = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  margin: 0 20px;
  background-color: ${props => props.color};
  transition: 0.5s;
`
const Away = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  margin: 0 20px;
  background-color: ${props => props.color};
  transition: 0.5s;
`
const Data = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  margin: 0 20px;
`

const Logo = styled.img`
  width: 40%;
  margin: 0 auto;
`
const Statistics = styled.div`
  text-align: center;
  color: ${props => props.color};
  transition: 0.5s;
  margin-top: 20px;
`

const UniTournament = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
`

const UniDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
`

export const BackButton = styled.button`
  background: transparent;
  outline: none;
  color: ${props => props.color};
  transition: 0.5s;
  border: 1px solid ${props => props.color};
  border-radius: 5px;
  font-size: 15px;
  margin-top: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
`


function EventDetails({eventInfo, statistics, uniqueTournament}: Props) {

    console.log(eventInfo);

    const Theme = useContext(ThemeContext);

    const router = useRouter()
    const [todaysDate, setTodaysDate] = useState<Date>(new Date());

    const {favs} = useContext<EventContext>(FavouriteContext);
    const [favToggle, setFavToggle] = useState<Boolean>(false);

    function addFavs(){
        setFavToggle(!favToggle);
        favs.push(eventInfo);
    }

    let d = new Date(eventInfo.startTimestamp * 1000);
    let h:string = d.getHours().toString();
    let m:string = d.getMinutes().toString();
    if(m === '0') m = m + '0';
    if(h === '0') h = m + '0';

    return (
        <>
        <EventDiv>
            <Buttons>
                <BackButton color={Theme.text} onClick={() => router.push(`/sport/${eventInfo.tournament.category.sport.name.toLowerCase()}/${todaysDate.toISOString().split('T')[0]}`)}>Back</BackButton>
                {!favToggle &&<FavButton theme={Theme} onClick={() => addFavs()}>Favourite</FavButton>}
            </Buttons>
            <Category color={Theme.text} >{eventInfo.tournament.category.name} - {eventInfo.tournament.name}</Category>
            {typeof eventInfo.venue !== 'undefined' && <Category color={Theme.text} >{eventInfo.venue.country.name}, {eventInfo.venue.city.name} - {eventInfo.venue.stadium.name}</Category>}
            <Score>
                <Home>
                    <Logo src={API_BASENAME + `team/${eventInfo.homeTeam.id}/image`}/>
                    <Text color={Theme.text} >{eventInfo.homeTeam.name}</Text>
                </Home>
                <Data>
                    {(eventInfo.winnerCode === 0 || typeof eventInfo.winnerCode === 'undefined') && <Text color={Theme.text} >{h}:{m}</Text>}
                    {eventInfo.winnerCode === 1 && <Text color={Theme.text} ><strong>{eventInfo.homeScore.display}</strong>:{eventInfo.awayScore.display}</Text>}
                    {eventInfo.winnerCode === 2 && <Text color={Theme.text} >{eventInfo.homeScore.display}:<strong>{eventInfo.awayScore.display}</strong></Text>}
                    {eventInfo.winnerCode === 3 && <Text color={Theme.text} >{eventInfo.homeScore.display}:{eventInfo.awayScore.display}</Text>}
                </Data>
                <Away>
                    <Logo src={API_BASENAME + `team/${eventInfo.awayTeam.id}/image`}/>
                    <Text color={Theme.text} >{eventInfo.awayTeam.name}</Text>
                </Away>
            </Score>

                {eventInfo.winnerCode > 0 && statistics.statistics &&

                    <Statistics color={Theme.secondText}>
                        {statistics.statistics[0].groups.map((stats) => (
                            // eslint-disable-next-line react/jsx-key
                            <div>{stats.statisticsItems.map((statItems) => (
                                // eslint-disable-next-line react/jsx-key
                                <StatDiv color={Theme.border}>
                                    <Home>
                                        <Stats color={Theme.secondText}>{statItems.home}</Stats>
                                    </Home>
                                    <Data>
                                        <Stats color={Theme.secondText}>{statItems.name}</Stats>
                                    </Data>
                                    <Away>
                                        <Stats color={Theme.secondText}>{statItems.away}</Stats>
                                    </Away>
                                </StatDiv>
                            ))}</div>
                        ))
                        }
                    </Statistics>
                }
            {eventInfo.winnerCode === 0 &&

                <Statistics color={Theme.secondText}>
                    <Stats color={Theme.secondText}>Statistics will be available after the event has ended.</Stats>
                </Statistics>
            }

            {uniqueTournament && uniqueTournament.titleHolder &&
                <UniTournament>

                    <UniDiv>
                        <Stats color={Theme.secondText}>Holder</Stats>
                        <Logo src={API_BASENAME + `team/${uniqueTournament.titleHolder.id}/image`}/>
                        <Stats color={Theme.secondText}>{uniqueTournament.titleHolder.name}</Stats>
                    </UniDiv>
                    <UniDiv>
                        <Stats color={Theme.secondText}>Most titles ({uniqueTournament.mostTitles.toString()})</Stats>
                        {uniqueTournament.mostTitlesTeams.map((t) => (
                            <UniDiv key={t.id}>
                                <Logo src={API_BASENAME + `team/${t.id}/image`}/>
                                <Stats color={Theme.secondText}>{t.name}</Stats>
                            </UniDiv>
                        ))}
                    </UniDiv>

                </UniTournament>
            }
        </EventDiv>

        </>
    );
}

export default EventDetails;

