import {Category, CategoryInfo} from "./Category";
import {Venue} from "./Venue";


export interface UniqueTournament {
    uniqueTournament: any;
    name: string;
    id: number;
    category: Category;
    primaryColorHex: String;
    secondaryColorHex: String;
    mostTitles: Number;
    titleHolderTitles: Number;
    startDateTimestamp: number;
    endDateTimestamp: number;
    titleHolder: Team;
    mostTitlesTeams: Team[];
}

interface Tournament {
    name: string;
    id: number;
    category: Category;
    uniqueTournament?: UniqueTournament;
    priority: number;
}

interface Team {
    id: number;
    name: String;
    nameCode: String;
    teamColors: TeamColors;
}

interface TeamColors {
    primary: String;
    secondary: String;
    text: String;
}

interface Score {
    current: number;
    display: number;
}

interface Status {
    code: number;
    description: String;
    type: String;
}

export interface EventInfo {
    event: EventInfo;
    events: EventInfo[];
    tournament: Tournament;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: Score;
    awayScore: Score;
    startTimestamp: number;
    status: Status;
    winnerCode: number;
    id: number;
    slug: String;
    venue: Venue;
}