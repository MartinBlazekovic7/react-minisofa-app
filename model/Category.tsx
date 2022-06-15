export interface Category {
    categories: Category[];
    name: String;
    id: number;
    priority: number;
    sport: Sport;
}

interface Sport {
    id: number;
    name: String;
}

export interface CategoryInfo {
    categories: any;
    category: Category;
    uniqueTournamentIds: number[];
}