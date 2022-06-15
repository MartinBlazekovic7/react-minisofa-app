import React, {useContext} from 'react';
import styled from "styled-components";
import {CategoryInfo} from "../model/Category";
import useSWR from "swr";
import fetcher from "../util/fetch";
import {EventInfo} from "../model/Event";
import EventRow from "./EventRow";
import {API_BASENAME} from "../util/ApiName";
import Link from "next/link";
import {SelectedContext, ThemeContext} from "../components/Layout";

export const CategoryRowDiv = styled.div`
  cursor: pointer;
  color: ${props => props.color};
  text-align: center;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  transition: 0.5s;
`
const Name = styled.h3`
  color: ${props => props.color};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  transition: 0.5s;
`

export const Logo = styled.img`
  width: 50px;
  height: 50px;
`

export const Tourney = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 25px;
  margin-top: 10px;
  margin-bottom: 3px;
`

const Hr = styled.hr`
  width: 90%;
  color: white;
`

export const TourneyName = styled.h4`
  color: ${props => props.color};
  padding-left: 10px;
  transition: 0.5s;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`

interface Props {
    categoryInfo: CategoryInfo;
}

interface EventResponse {
    events: EventInfo[];
}

function CategoryRow({categoryInfo}: Props) {

    const Theme = useContext(ThemeContext);

    const Selected = useContext(SelectedContext);

    const [shouldFetch, setShouldFetch] = React.useState(false);
    const { data } = useSWR<EventResponse>(shouldFetch ? API_BASENAME + `category/${categoryInfo.category.id}/scheduled-events/${Selected.date.toISOString().split('T')[0]}` : null, fetcher);

    function handleClick() {
        setShouldFetch(!shouldFetch);
        console.log(data);
        /*data?.events.map((event: EventInfo) => {
            if(new Date(event.startTimestamp*1000).toDateString() !== Selected.date.toDateString()){
                data?.events.splice(data?.events.indexOf(event), 1);
                console.log("dobri");
            } else {
                console.log("nevalja");
            }
        })*/
        console.log(data);
    }

    return (
        <>
        <CategoryRowDiv onClick={handleClick} color={Theme.text}>
            <Link href={`/category/${Selected.date.toISOString().split('T')[0]}/${categoryInfo.category.id}`}><Name color={Theme.text}>{categoryInfo.category.name}</Name></Link>
        </CategoryRowDiv>
            <Hr/>
        {data?.events.map((event: EventInfo) => (
        <div key={event.id}>
            <>
                {data?.events.indexOf(event) === 0 && new Date(event.startTimestamp*1000).toDateString() === Selected.date.toDateString() &&
                    <><Tourney>
                        <Logo src={API_BASENAME + `unique-tournament/${event.tournament.uniqueTournament?.id}/image`}
                              alt={"No image"}/>
                        {event.tournament.name.includes(event.tournament.uniqueTournament?.name as string) &&
                            <TourneyName color={Theme.secondText}>{event.tournament.name}</TourneyName>}
                        {!event.tournament.name.includes(event.tournament.uniqueTournament?.name as string) &&
                            <><TourneyName
                                color={Theme.secondText}>{event.tournament.uniqueTournament?.name} - </TourneyName>
                                <TourneyName color={Theme.secondText}>{event.tournament.name}</TourneyName></>}
                    </Tourney>
                    </>
                }
                {data?.events.indexOf(event) > 0 && data?.events[data?.events.indexOf(event) - 1].tournament.name === event.tournament.name && new Date(event.startTimestamp*1000).toDateString() === Selected.date.toDateString() && new Date(data?.events[data?.events.indexOf(event) - 1].startTimestamp*1000).toDateString() !== Selected.date.toDateString() &&
                    <><Tourney>
                        <Logo src={API_BASENAME + `unique-tournament/${event.tournament.uniqueTournament?.id}/image`} alt={"No image"}/>
                        {event.tournament.name.includes(event.tournament.uniqueTournament?.name as string) &&
                            <TourneyName color={Theme.secondText}>{event.tournament.name}</TourneyName>}
                        {!event.tournament.name.includes(event.tournament.uniqueTournament?.name as string) &&
                            <><TourneyName
                                color={Theme.secondText}>{event.tournament.uniqueTournament?.name} - </TourneyName>
                                <TourneyName color={Theme.secondText}>{event.tournament.name}</TourneyName></>}
                    </Tourney>

                    </>
                }
                {data?.events.indexOf(event) > 0 && data?.events[data?.events.indexOf(event) - 1].tournament.name !== event.tournament.name && new Date(event.startTimestamp*1000).toDateString() === Selected.date.toDateString() &&
                    <><Tourney>
                        <Logo src={API_BASENAME + `unique-tournament/${event.tournament.uniqueTournament?.id}/image`} alt={"No image"}/>
                        {event.tournament.name.includes(event.tournament.uniqueTournament?.name as string) &&
                            <TourneyName color={Theme.secondText}>{event.tournament.name}</TourneyName>}
                        {!event.tournament.name.includes(event.tournament.uniqueTournament?.name as string) &&
                            <><TourneyName
                                color={Theme.secondText}>{event.tournament.uniqueTournament?.name} - </TourneyName>
                                <TourneyName color={Theme.secondText}>{event.tournament.name}</TourneyName></>}
                    </Tourney>

                    </>
                }
                <EventRow eventInfo={event}/>
            </>


        </div>
        ))}
        </>
    );
}

export default CategoryRow;