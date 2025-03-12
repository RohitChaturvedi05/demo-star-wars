import { mockCharacters, mockPlanets } from '../../__mocks__/charactersData';
import { Action, ActionType } from '../actions';
import { initialState, reducer, State } from '../reducer';

describe('state/Reducers', () => {
    it('should handle SET_CHARACTERS action', () => {
        const action: Action = {
            type: ActionType.SET_CHARACTERS,
            payload: mockCharacters,
        };
        expect(reducer(initialState, action)).toMatchObject({
            characters: mockCharacters,
        });
    });
    it('should handle SET_TOTAL_PAGE action', () => {
        const action: Action = {
            type: ActionType.SET_TOTAL_PAGE,
            payload: 10,
        };
        expect(reducer(initialState, action)).toMatchObject({
            totalPage: 10,
        });
    });
    it('should handle SET_CURRENT_PAGE action', () => {
        const action: Action = {
            type: ActionType.SET_CURRENT_PAGE,
            payload: 2,
        };
        expect(reducer(initialState, action)).toMatchObject({
            currentPage: 2,
        });
    });
    it('should handle SET_PLANETS action', () => {
        const action: Action = {
            type: ActionType.SET_PLANETS,
            payload: mockPlanets,
        };
        const state: State = {
            ...initialState,
            planets: {
                '11': {
                    id: '11',
                    name: 'Tatooine',
                    diameter: '10465',
                    gravity: '1 standard',
                    population: '200000',
                },
            },
        };
        expect(reducer(state, action)).toMatchObject({
            planets: {
                ...state.planets,
                '1': {
                    id: '1',
                    name: 'Tatooine',
                    diameter: '10465',
                    gravity: '1',
                    population: '200000',
                },
                '2': {
                    id: '2',
                    name: 'Alderaan',
                    diameter: '12500',
                    gravity: '1',
                    population: '2000000000',
                },
            },
        });
    });
});
