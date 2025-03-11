import { Characters } from '../models/Character';
import { CHARACTERS_URL } from './constants';
import { CharacterResponse } from './models';
import { transformRecord } from './utils/transformRecord';

type GetCharactersParams = {
    page: number;
    limit?: number;
};
type GetCharactersReturnType = {
    characters: Characters;
    total_pages: number;
    total_records: number;
};

export const getCharacters = async (
    params: GetCharactersParams
): Promise<GetCharactersReturnType> => {
    try {
        const { page = 1, limit = 10 } = params;
        const url = `${CHARACTERS_URL}?page=${page}&limit=${limit}&expanded=true`;
        const response = await fetch(url);

        const data: {
            results: CharacterResponse[];
            total_pages: number;
            total_records: number;
        } = await response.json();

        return {
            characters: data.results.map(transformRecord),
            total_pages: data?.total_pages ?? 0,
            total_records: data?.total_records ?? 0,
        };
    } catch (error) {
        console.log(error);
        return {
            characters: [],
            total_pages: 0,
            total_records: 0,
        };
    }
};
