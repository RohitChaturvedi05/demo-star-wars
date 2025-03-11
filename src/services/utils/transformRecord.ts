import { Character } from '../../models/Character';
import { CharacterResponse } from '../models';
import { extractPlanetId } from './extractPlanetId';

export const transformRecord = (record: CharacterResponse): Character => {
    const { properties, uid, _id } = record ?? {};

    return {
        uid,
        id: _id,
        name: properties.name,
        gender: properties.gender,
        skin_color: properties.skin_color,
        hair_color: properties.hair_color,
        height: properties.height,
        eye_color: properties.eye_color,
        mass: properties.mass,
        birth_year: properties.birth_year,
        homeworldUrl: properties.homeworld,
        homeworld: String(extractPlanetId(properties.homeworld) ?? ''),
    };
};
