import { Characters, Planet } from '../models/Character';
import { Action, ActionType } from './actions';

export interface State {
    characters: Characters;
    favCharacters: string[];
    totalPage: number;
    currentPage: number;
    planets: Record<string, Planet>;
    limit: number;
}

export const initialState: State = {
    characters: [],
    favCharacters: [],
    totalPage: 0,
    currentPage: 1,
    planets: {},
    limit: 10,
};

const updateFavCharacters = (favCharacters: string[], id: string) => {
    if (favCharacters.includes(id)) {
        return favCharacters.filter((item) => item !== id);
    } else {
        return [...favCharacters, id];
    }
};

const logger = (reducer: (state: State, action: Action) => State) => {
    return (state: State, action: Action): State => {
        // console.log('Previous State:', state);
        // console.log('Action:', action);
        const nextState = reducer(state, action);
        console.log('Next State:', nextState);
        return nextState;
    };
};

const baseReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SET_CHARACTERS:
            return { ...state, characters: action.payload };
        case ActionType.SET_TOTAL_PAGE:
            return { ...state, totalPage: action.payload };
        case ActionType.SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        case ActionType.SET_PLANETS:
            return {
                ...state,
                planets: {
                    ...state.planets,
                    ...action.payload,
                },
            };
        case ActionType.SET_FAV_CHARACTERS:
            return {
                ...state,
                favCharacters: updateFavCharacters(
                    state.favCharacters,
                    action.payload
                ),
            };
        default:
            return state;
    }
};

export const reducer = logger(baseReducer);
