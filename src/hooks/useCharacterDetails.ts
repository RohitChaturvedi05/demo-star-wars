import { useCallback, useState } from 'react';
import { Character, Film, Starship } from '../models/Character';
import { getCharacterById } from '../services/getCharacterById';
import { getFilm } from '../services/getFilms';
import { getPlanetsByIds } from '../services/getPlanets';
import { getStarShip } from '../services/getStarship';
import { useStateContext } from '../state';
import { ActionType } from '../state/actions';

export const useCharacterDetails = () => {
    const { state, dispatch } = useStateContext();
    const { planets } = state;
    const [character, setCharacter] = useState<Character>();
    const [films, setFilms] = useState<Film[]>([]);
    const [starShips, setStarShips] = useState<Starship[]>([]);

    const getCharacterDetails = useCallback(
        async (id: string) => {
            const characterData = await getCharacterById(id);
            if (characterData) {
                const planetId = parseInt(characterData?.homeworld ?? '');
                if (planets[planetId] === undefined) {
                    const data = await getPlanetsByIds([planetId]);
                    dispatch({ type: ActionType.SET_PLANETS, payload: data });
                }
                const filePromise = characterData?.films.map(getFilm);
                const starShipPromise =
                    characterData?.starships.map(getStarShip);

                const allFilms = await Promise.all(filePromise);
                const allStarShips = await Promise.all(starShipPromise);

                setFilms(allFilms.filter((film) => !!film) as Film[]);
                setStarShips(
                    allStarShips.filter((starShip) => !!starShip) as Starship[]
                );
                setCharacter(characterData);
            }
        },
        [dispatch, planets]
    );

    const onAddToFavorites = useCallback(
        (id: string) => {
            dispatch({
                type: ActionType.SET_FAV_CHARACTERS,
                payload: id,
            });
        },
        [dispatch]
    );
    return {
        films,
        starShips,
        planets,
        character,
        onAddToFavorites,
        getCharacterDetails,
    };
};
