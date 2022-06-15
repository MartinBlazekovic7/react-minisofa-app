interface City {
    name: String;
}
interface Country {
    name: String;
}
interface Stadium {
    name: String;
    capacity: Number;
}

export interface Venue {
    city: City;
    country: Country;
    stadium: Stadium;
}