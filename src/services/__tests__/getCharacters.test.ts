import { CHARACTERS_URL } from '../constants';
import { getCharacters } from '../getCharacters';
import { transformRecord } from '../utils/transformRecord';

jest.mock('../utils/transformRecord', () => ({
    transformRecord: jest.fn((character) => character),
}));

describe('getCharacters', () => {
    const mockCharacterData = [
        {
            name: 'Luke Skywalker',
            id: '1',
            gender: 'male',
        },
        {
            name: 'Darth Vader',
            id: '2',
            gender: 'male',
        },
    ];
    beforeAll(() => {
        console.log = jest.fn();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch characters and return the correct data', async () => {
        const mockResponse = {
            results: mockCharacterData,
            total_pages: 2,
            total_records: 20,
        };

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const params = { page: 1, limit: 10 };
        const result = await getCharacters(params);

        expect(global.fetch).toHaveBeenCalledWith(
            `${CHARACTERS_URL}?page=1&limit=10&expanded=true`
        );

        expect(result).toEqual({
            characters: mockCharacterData,
            total_pages: 2,
            total_records: 20,
        });
    });

    it('should handle empty results and return default values', async () => {
        const mockResponse = {
            results: [],
            total_pages: 0,
            total_records: 0,
        };

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const params = { page: 1, limit: 10 };
        const result = await getCharacters(params);

        expect(result).toEqual({
            characters: [],
            total_pages: 0,
            total_records: 0,
        });
    });

    it('should handle error during fetch and return default values', async () => {
        global.fetch = jest
            .fn()
            .mockRejectedValueOnce(new Error('Network Error'));

        const params = { page: 1, limit: 10 };
        const result = await getCharacters(params);

        expect(result).toEqual({
            characters: [],
            total_pages: 0,
            total_records: 0,
        });
    });

    it('should return characters with default parameters if no params are provided', async () => {
        const mockResponse = {
            results: mockCharacterData,
            total_pages: 2,
            total_records: 20,
        };

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await getCharacters({ page: 1 });

        expect(result).toEqual({
            characters: mockCharacterData,
            total_pages: 2,
            total_records: 20,
        });
    });

    it('should call transformRecord for each character', async () => {
        const mockResponse = {
            results: mockCharacterData,
            total_pages: 2,
            total_records: 20,
        };

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const params = { page: 1, limit: 10 };
        await getCharacters(params);

        expect(transformRecord).toHaveBeenCalledTimes(mockCharacterData.length);
    });
});
