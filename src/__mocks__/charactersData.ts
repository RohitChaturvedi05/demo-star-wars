import {
    CharacterDetails,
    Characters,
    Film,
    Starship,
} from '../models/Character';

export const mockCharacters: Characters = [
    {
        uid: '1',
        id: '1',
        name: 'Luke Skywalker',
        gender: 'male',
        skin_color: 'fair',
        hair_color: 'blond',
        height: '172',
        eye_color: 'blue',
        mass: '77',
        birth_year: '19BBY',
        homeworldUrl: 'http://swapi.dev/api/planets/1/',
        homeworld: '1',
    },
    {
        uid: '2',
        id: '2',
        name: 'Leia Organa',
        gender: 'female',
        skin_color: 'light',
        hair_color: 'brown',
        height: '150',
        eye_color: 'brown',
        mass: '49',
        birth_year: '19BBY',
        homeworldUrl: 'http://swapi.dev/api/planets/2/',
        homeworld: '2',
    },
];

export const mockFavoriteCharacters: Characters = [
    {
        uid: '1',
        id: '1',
        name: 'Luke Skywalker',
        gender: 'male',
        skin_color: 'fair',
        hair_color: 'blond',
        height: '172',
        eye_color: 'blue',
        mass: '77',
        birth_year: '19BBY',
        homeworldUrl: 'http://swapi.dev/api/planets/1/',
        homeworld: '1',
    },
];

export const mockPlanets = {
    1: {
        id: '1',
        name: 'Tatooine',
        diameter: '10465',
        gravity: '1',
        population: '200000',
    },
    2: {
        id: '2',
        name: 'Alderaan',
        diameter: '12500',
        gravity: '1',
        population: '2000000000',
    },
};

export const mockCharacterDetails: CharacterDetails = {
    uid: '1',
    id: '1',
    name: 'Luke Skywalker',
    gender: 'male',
    skin_color: 'fair',
    hair_color: 'blond',
    height: '172',
    eye_color: 'blue',
    mass: '77',
    birth_year: '19BBY',
    homeworldUrl: 'http://swapi.dev/api/planets/1/',
    homeworld: '1',
    films: ['http://swapi.dev/api/film/1', 'http://swapi.dev/api/film/2'],
    starships: [
        'http://swapi.dev/api/starship/1',
        'http://swapi.dev/api/starship/2',
    ],
};

export const mockFilms: Film[] = [
    {
        id: '1',
        title: 'A New Hope',
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
    },
    {
        id: '2',
        title: 'The Empire Strikes Back',
        director: 'Irvin Kershner',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1980-05-17',
    },
];

export const mockStarship: Starship[] = [
    {
        name: 'Millennium Falcon',
        cargo_capacity: '100000',
        passengers: '6',
        max_atmosphering_speed: '1050',
        manufacturer: 'Corellian Engineering Corporation',
    },
    {
        name: 'X-wing',
        cargo_capacity: '100000',
        passengers: '6',
        max_atmosphering_speed: '1050',
        manufacturer: 'Incom Corporation',
    },
];
