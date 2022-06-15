export interface Theme {
    header: string;
    text: string;
    body: string;
    secondText: string;
    main: string;
    border: string;
    white: string;
    selected: string;
}

export const lightTheme : Theme= {
    header: '#0070f3',
    text: '#14435e',
    body: '#DEE4EA',
    secondText: '#434343',
    main: 'white',
    border: 'gray',
    white: 'white',
    selected: '#14435e'
}

export const darkTheme : Theme = {
    header: '#14435e',
    text: '#DDDDDD',
    body: '#39474b',
    secondText: '#dad9d9',
    main: '#495459',
    border: '#DDDDDD',
    white: 'white',
    selected: '#0070f3'
}