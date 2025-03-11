import { Characters } from '../models/Character';
import { CHARACTERS_URL } from './constants';
import { CharacterResponse } from './models';
import { transformRecord } from './utils/transformRecord';

type GetCharactersSearchParams = {
    page?: number;
    limit?: number;
    name: string;
};

type GetCharactersSearchReturnType = {
    characters: Characters;
    total_pages: number;
    total_records: number;
};

export const getCharactersSearch = async (
    params: GetCharactersSearchParams
): Promise<GetCharactersSearchReturnType> => {
    try {
        const { page = 1, limit = 10, name = '' } = params;
        const url = `${CHARACTERS_URL}?page=${page}&limit=${limit}&name=${name}&expanded=true`;
        const response = await fetch(url);

        const data: {
            result: CharacterResponse[];
            total_pages: number;
            total_records: number;
        } = await response.json();

        return {
            characters: (data?.result ?? []).map(transformRecord),
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
