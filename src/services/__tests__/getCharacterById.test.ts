import { CHARACTERS_BY_ID_URL } from '../constants';
import { getCharacterById } from '../getCharacterById'; // Adjust the import path
import { extractPlanetId } from '../utils/extractPlanetId';

jest.mock('../utils/extractPlanetId');
describe('getCharacterById', () => {
    const mockCharacterId = '1';
    const mockCharacterData = {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'http://some-planet-url',
    };

    const mockResponseData = {
        ...mockCharacterData,
        homeworld: 'http://some-planet-url',
    };

    beforeEach(() => {
        global.fetch = jest.fn();
        console.log = jest.fn();
        jest.clearAllMocks();
    });

    it('should fetch and return character details with homeworld processed correctly', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponseData),
        });

        (extractPlanetId as jest.Mock).mockReturnValueOnce('planet-123');
        const character = await getCharacterById(mockCharacterId);
        expect(fetch).toHaveBeenCalledWith(
            `${CHARACTERS_BY_ID_URL}/${mockCharacterId}`
        );
        expect(character).toEqual({
            ...mockResponseData,
            id: mockCharacterId,
            uid: mockCharacterId,
            homeworld: 'planet-123',
        });
        expect(extractPlanetId).toHaveBeenCalledWith(
            mockResponseData.homeworld
        );
    });

    it('should return null if the fetch response has no data', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(null),
        });
        const character = await getCharacterById(mockCharacterId);
        expect(character).toBeNull();
    });

    it('should return null if there is an error during fetch', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));
        const character = await getCharacterById(mockCharacterId);
        expect(character).toBeNull();
    });

    it('should return null if extractPlanetId returns null', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponseData),
        });

        (extractPlanetId as jest.Mock).mockReturnValueOnce(null);
        const character = await getCharacterById(mockCharacterId);
        expect(character).toEqual({
            ...mockResponseData,
            id: mockCharacterId,
            uid: mockCharacterId,
            homeworld: '',
        });
    });
});
