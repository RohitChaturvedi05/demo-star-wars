import { Planet } from '../models/Character';
import { PLANETS_URL } from './constants';
import { PlanetResponse } from './models';

export const getPlanetsByIds = async (
    ids: number[]
): Promise<Record<string, Planet>> => {
    const unqId = new Set(ids);
    const response = await Promise.all(
        Array.from(unqId).map((id) =>
            fetch(`${PLANETS_URL}/${id}`).then((res) => res.json())
        )
    );

    return response.reduce((acc, { result }: PlanetResponse) => {
        acc[result.uid] = {
            id: result.uid,
            name: result.properties.name,
            diameter: result.properties.diameter,
            gravity: result.properties.gravity,
            population: result.properties.population,
        };
        return acc;
    }, {});
};
