import { Gender } from '../components/Gender';
import { Character, Characters, Planet } from '../models/Character';
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

// Added for Testing
// const logger = (reducer: (state: State, action: Action) => State) => {
//     return (state: State, action: Action): State => {
//         // console.log('Previous State:', state);
//         // console.log('Action:', action);
//         const nextState = reducer(state, action);
//         console.log('Next State:', nextState);
//         return nextState;
//     };
// };

const updateGender = (
    state: State,
    payload: { value: Gender; id: string }
): State => {
    const updatedChars: Characters = state.characters.reduce(
        (acc, item: Character) => {
            if (item.id === payload.id) {
                const updatedRec: Character = {
                    ...item,
                    gender: payload.value,
                };
                acc.push(updatedRec);
            } else {
                acc.push(item);
            }
            return acc;
        },
        [] as Characters
    );

    return {
        ...state,
        characters: [...updatedChars],
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
        case ActionType.SET_GENDER:
            return updateGender(state, action.payload);
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

// export const reducer = logger(baseReducer);
export const reducer = baseReducer;
