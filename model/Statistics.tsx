interface StatisticsItems {
    name: String;
    home: String;
    away: String;
}

interface Group {
    groupName: String;
    statisticsItems: StatisticsItems[];
}

export interface Statistics {
    statistics: Statistics[];
    period?: String;
    groups: Group[];
}