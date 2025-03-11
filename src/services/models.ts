import { CharacterDetails, Film } from '../models/Character';

export type CharacterResponse = {
    properties: {
        created: string;
        edited: string;
        name: string;
        gender: string;
        skin_color: string;
        hair_color: string;
        height: string;
        eye_color: string;
        mass: string;
        homeworld: string;
        birth_year: string;
        url: string;
    };
    _id: string;
    description: string;
    uid: string;
};

export type StarShipResponse = {
    name: string;
    cargo_capacity: string;
    passengers: string;
    max_atmosphering_speed: string;
    manufacturer: string;
};

export type PlanetResponse = {
    result: {
        uid: string;
        properties: {
            name: string;
            diameter: string;
            gravity: string;
            population: string;
        };
    };
};

export type CharacterByIdResponse = Omit<CharacterDetails, 'id'>;

export type FilmResponse = Film;
