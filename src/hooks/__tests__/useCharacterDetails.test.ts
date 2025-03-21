import { act, renderHook, waitFor } from '@testing-library/react';
import {
    mockCharacterDetails,
    mockFilms,
    mockPlanets,
    mockStarship,
} from '../../__mocks__/charactersData';
import { getCharacterById } from '../../services/getCharacterById';
import { getFilm } from '../../services/getFilms';
import { getPlanetsByIds } from '../../services/getPlanets';
import { getStarShip } from '../../services/getStarship';
import { useStateContext } from '../../state';
import { initialState } from '../../state/reducer';
import { useCharacterDetails } from '../useCharacterDetails';

jest.mock('../../state', () => ({ useStateContext: jest.fn() }));
jest.mock('../../services/getCharacterById', () => ({
    getCharacterById: jest.fn(),
}));
jest.mock('../../services/getPlanets', () => ({
    getPlanetsByIds: jest.fn(),
}));
jest.mock('../../services/getFilms', () => ({
    getFilm: jest.fn(),
}));
jest.mock('../../services/getStarship', () => ({
    getStarShip: jest.fn(),
}));

const dispatch = jest.fn();
describe('hooks/useCharacterDetails', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useStateContext as jest.Mock).mockReturnValue({
            state: initialState,
            dispatch,
        });
    });
    it('should initialize with default state values', () => {
        const { result } = renderHook(() => useCharacterDetails());

        expect(result.current.character).toBe(undefined);
        expect(result.current.films).toEqual([]);
        expect(result.current.starShips).toEqual([]);
    });

    it('should return getCharacterDetails', () => {
        (getCharacterById as jest.Mock).mockResolvedValue(mockCharacterDetails);
        (getPlanetsByIds as jest.Mock).mockResolvedValue(mockPlanets);
        (getFilm as jest.Mock)
            .mockResolvedValueOnce(mockFilms[0])
            .mockResolvedValueOnce(mockFilms[1]);
        (getStarShip as jest.Mock)
            .mockResolvedValueOnce(mockStarship[0])
            .mockResolvedValueOnce(mockStarship[1]);

        const { result } = renderHook(() => useCharacterDetails());
        act(() => {
            result.current.getCharacterDetails('1');
        });
        waitFor(() => {
            expect(result.current.character).toEqual(mockFilms);
            expect(result.current.films).toEqual(mockFilms);
            expect(result.current.starShips).toEqual(mockStarship);
        });
    });

    it('should call addToFavorites', () => {
        const { result } = renderHook(() => useCharacterDetails());
        const { onAddToFavorites } = result.current;
        onAddToFavorites('1');
        expect(dispatch).toHaveBeenCalledWith({
            type: 'SET_FAV_CHARACTERS',
            payload: '1',
        });
    });

    it('should call onGenderChange', () => {
        const { result } = renderHook(() => useCharacterDetails());
        const { onGenderChange } = result.current;
        onGenderChange('male', '1');
        expect(dispatch).toHaveBeenCalledWith({
            type: 'SET_GENDER',
            payload: {
                id: '1',
                value: 'male',
            },
        });
    });
});
