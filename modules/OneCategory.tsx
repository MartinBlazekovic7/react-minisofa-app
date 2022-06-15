import React, {useContext, useState} from 'react';
import {EventInfo} from "../model/Event";
import EventRow from "./EventRow";
import styled from "styled-components";
import {useRouter} from "next/router";
import {API_BASENAME} from "../util/ApiName";
import {Tourney, Logo, TourneyName} from "./CategoryRow";
import {Title} from "./Categories";
import {BackButton} from "./EventDetails";
import {SelectedContext, ThemeContext} from "../components/Layout";

interface Props {
    events: EventInfo[];
}

const Events = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`

function OneCategory({events}: Props) {
    console.log(events);

    const Theme = useContext(ThemeContext);
    const Selected = useContext(SelectedContext);

    const [todayDate, setTodayDate] = useState<Date>(new Date());

    const router = useRouter();

    return (
        <Events>
            <BackButton  color={Theme.text} onClick={() => router.push(`/sport/${events[0].tournament.category.sport.name.toLowerCase()}/${todayDate.toISOString().split('T')[0]}`)}>Back</BackButton>
            <Title color={Theme.text}>{events[0].tournament.category.name}</Title>
            {events.map((event) => (
                <div key={event.id}>
                    {events.indexOf(event) === 0 && new Date(event.startTimestamp*1000).toDateString() === Selected.date.toDateString() &&
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
                    {events.indexOf(event) > 0 && events[events.indexOf(event) - 1].tournament.name === event.tournament.name && new Date(event.startTimestamp*1000).toDateString() === Selected.date.toDateString() && new Date(events[events.indexOf(event) - 1].startTimestamp*1000).toDateString() !== Selected.date.toDateString() &&
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
                    {events.indexOf(event) > 0 && events[events.indexOf(event) - 1].tournament.name !== event.tournament.name && new Date(event.startTimestamp*1000).toDateString() === Selected.date.toDateString() &&
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
                </div>
            ))}
        </Events>
    );
}

export default OneCategory;