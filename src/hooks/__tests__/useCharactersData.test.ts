import { act, renderHook } from '@testing-library/react';
import { mockCharacters, mockPlanets } from '../../__mocks__/charactersData';
import { getCharacters } from '../../services/getCharacters';
import { getPlanetsByIds } from '../../services/getPlanets';
import { getCharactersSearch } from '../../services/searchByCharacterName';
import { useStateContext } from '../../state';
import { initialState } from '../../state/reducer';
import { useCharactersData } from '../useCharactersData';

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock('../../services/getCharacters', () => ({
    getCharacters: jest.fn(),
}));

jest.mock('../../services/getPlanets', () => ({
    getPlanetsByIds: jest.fn(),
}));

jest.mock('../../services/searchByCharacterName', () => ({
    getCharactersSearch: jest.fn(),
}));

jest.mock('../../state', () => ({
    useStateContext: jest.fn(),
}));

const dispatch = jest.fn();

describe('hooks/useCharactersData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useStateContext as jest.Mock).mockReturnValue({
            state: initialState,
            dispatch,
        });
    });

    it('should fetch characters data successfully', async () => {
        (getCharacters as jest.Mock).mockResolvedValue({
            characters: mockCharacters,
            total_pages: 1,
        });
        (getPlanetsByIds as jest.Mock).mockResolvedValue(mockPlanets);

        const { result } = renderHook(() => useCharactersData());

        await act(async () => {
            await result.current.getCharactersData(1);
        });

        expect(getCharacters).toHaveBeenCalledWith({ page: 1 });
        expect(getPlanetsByIds).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(result.current.isLoading).toBe(false);
    });

    it('should search characters by name', async () => {
        (getCharactersSearch as jest.Mock).mockResolvedValue({
            characters: mockCharacters,
        });
        const { result } = renderHook(() => useCharactersData());

        await act(async () => {
            await result.current.searchCharactersByName('Luke');
        });

        expect(getCharactersSearch).toHaveBeenCalledWith({
            page: 1,
            name: 'Luke',
        });
        expect(dispatch).toHaveBeenCalledTimes(2);
    });

    it('should toggle favorite character', () => {
        const { result } = renderHook(() => useCharactersData());

        act(() => {
            result.current.onFavoriteToggle('1');
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: 'SET_FAV_CHARACTERS',
            payload: '1',
        });
    });

    it('should handle page change', async () => {
        const { result } = renderHook(() => useCharactersData());

        await act(async () => {
            await result.current.onPageChange(2);
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: 'SET_CURRENT_PAGE',
            payload: 2,
        });
    });

    it('should return correct favorites list', () => {
        (useStateContext as jest.Mock).mockReturnValue({
            state: {
                ...initialState,
                characters: mockCharacters,
                favCharacters: ['1'],
            },
            dispatch,
        });

        const { result } = renderHook(() => useCharactersData());

        expect(result.current.favorites).toHaveLength(1);
        expect(result.current.favorites[0].name).toBe('Luke Skywalker');
    });
});
