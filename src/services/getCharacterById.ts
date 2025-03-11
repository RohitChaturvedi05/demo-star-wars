import { CharacterDetails } from '../models/Character';
import { CHARACTERS_BY_ID_URL } from './constants';
import { CharacterByIdResponse } from './models';
import { extractPlanetId } from './utils/extractPlanetId';

export const getCharacterById = async (
    id: string
): Promise<CharacterDetails | null> => {
    try {
        const response = await fetch(`${CHARACTERS_BY_ID_URL}/${id}`);
        const data: CharacterByIdResponse = await response.json();
        if (!data) return null;
        return {
            ...data,
            id: id,
            uid: id,
            homeworld: String(extractPlanetId(data.homeworld) ?? ''),
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};
