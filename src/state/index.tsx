import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { Action } from './actions';
import { initialState, reducer, State } from './reducer';

const CharacterContext = createContext<
    { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <CharacterContext.Provider value={{ state, dispatch }}>
            {children}
        </CharacterContext.Provider>
    );
};

export const useStateContext = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useStateContext must be used within a StateProvider');
    }
    return context;
};
