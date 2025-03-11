export type Planet = {
    id: string;
    name: string;
    diameter: string;
    gravity: string;
    population: string;
};

export type Film = {
    id: string;
    title: string;
    director: string;
    producer: string;
    release_date: string;
};

export type Starship = {
    name: string;
    cargo_capacity: string;
    passengers: string;
    max_atmosphering_speed: string;
    manufacturer: string;
};

export type Character = {
    uid: string;
    id: string;
    name: string;
    gender: string;
    skin_color: string;
    hair_color: string;
    height: string;
    eye_color: string;
    mass: string;
    birth_year: string;
    homeworldUrl: string;
    homeworld: string;
};

export type CharacterDetails = Character & {
    films: string[];
    starships: string[];
};

export type Characters = Character[];
