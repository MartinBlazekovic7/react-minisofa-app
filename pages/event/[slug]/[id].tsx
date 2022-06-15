import fetcher from "../../../util/fetch";
import {GetServerSideProps} from "next";
import {EventInfo, UniqueTournament} from "../../../model/Event";
import EventDetails from "../../../modules/EventDetails";
import {API_BASENAME} from "../../../util/ApiName";
import {Statistics} from "../../../model/Statistics";

interface EventPageInterface {
    details: EventInfo;
    statistics: Statistics;
    uniqueTournament: UniqueTournament;
}


export default function EventPage(props: EventPageInterface) {

    const {details, statistics, uniqueTournament} = props
    return <><EventDetails eventInfo={details.event} statistics={statistics} uniqueTournament={uniqueTournament.uniqueTournament}/></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, res } = context;

    try {
        //@ts-ignore
        const { slug, id } = params;

        const details = await fetcher(API_BASENAME + `event/${id}`);
        const statistics = await fetcher(API_BASENAME + `event/${details.event.id}/statistics`);
        const uniqueTourney = await fetcher(API_BASENAME + `unique-tournament/${details.event.tournament.uniqueTournament.id}`)

        const props: EventPageInterface = {details: details, statistics: statistics, uniqueTournament: uniqueTourney || []}
        return {
                props: props,
            };

    } catch (error) {
        res.statusCode = 404;
        return { props: { error } };
    }
};