import { Film } from '../models/Character';
import { FilmResponse } from './models';

export const getFilm = async (url: string): Promise<Film | null> => {
    try {
        const response = await fetch(url);
        const data: FilmResponse = await response.json();
        if (!data) return null;
        const { title, director, producer, release_date } = data;
        return {
            id: title,
            title,
            director,
            producer,
            release_date,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};
