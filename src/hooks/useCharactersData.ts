import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_PATH } from '../routes/constants';
import { getCharacters } from '../services/getCharacters';
import { getPlanetsByIds } from '../services/getPlanets';
import { getCharactersSearch } from '../services/searchByCharacterName';
import { extractPlanetId } from '../services/utils/extractPlanetId';
import { useStateContext } from '../state';
import { ActionType } from '../state/actions';
import { useDebounce } from './useDebounce';

export const useCharactersData = () => {
    const [queryTerm, setQueryTerm] = useState('');
    const debounceQuery = useDebounce(queryTerm, 300);

    const [isLoading, setLoading] = useState(false);
    const { state, dispatch } = useStateContext();
    const { planets } = state;

    const navigate = useNavigate();

    const getCharactersData = useCallback(
        async (page: number) => {
            setLoading(true);
            const { characters, total_pages } = await getCharacters({
                page,
            });

            // get planets ids from characters
            const planetsId = characters
                .map((item) => extractPlanetId(item.homeworldUrl))
                .filter((id): id is number => id !== null && id !== undefined)
                .filter((id) => planets[id] === undefined);

            // Update planets state if needed
            if (planetsId.length > 0) {
                const planetsData = await getPlanetsByIds(
                    Array.from(new Set(planetsId))
                );
                dispatch({
                    type: ActionType.SET_PLANETS,
                    payload: planetsData,
                });
            }
            dispatch({ type: ActionType.SET_CHARACTERS, payload: characters });
            dispatch({ type: ActionType.SET_TOTAL_PAGE, payload: total_pages });
            dispatch({
                type: ActionType.SET_CURRENT_PAGE,
                payload: page,
            });

            setLoading(false);
        },
        [dispatch, planets]
    );

    const searchCharactersByName = useCallback(
        async (name: string) => {
            setLoading(true);
            const { characters } = await getCharactersSearch({
                page: 1,
                name,
            });
            dispatch({ type: ActionType.SET_CHARACTERS, payload: characters });
            dispatch({ type: ActionType.SET_TOTAL_PAGE, payload: 0 });
            setLoading(false);
        },
        [dispatch]
    );

    const onFavoriteToggle = useCallback(
        (id: string) => {
            dispatch({
                type: ActionType.SET_FAV_CHARACTERS,
                payload: id,
            });
        },
        [dispatch]
    );

    const onDetailClick = useCallback(
        (id: string) => {
            navigate(`${APP_PATH.DETAILS}/${id}`);
        },
        [navigate]
    );

    const onPageChange = async (page: number) => {
        dispatch({
            type: ActionType.SET_CURRENT_PAGE,
            payload: page,
        });
        await getCharactersData(page);
    };

    const onSearch = async (searchTerm: string) => {
        setQueryTerm(searchTerm);
        setLoading(true);
        if (searchTerm.length === 0) {
            await onPageChange(1);
        }
    };

    const initializeState = useCallback(
        () => getCharactersData(1),
        [getCharactersData]
    );

    const favorites = useMemo(() => {
        return state.characters.filter(({ uid }) =>
            state.favCharacters.includes(uid)
        );
    }, [state.characters, state.favCharacters]);

    return {
        isLoading,
        favorites,
        queryTerm,
        debounceQuery,
        characters: state.characters,
        planets: state.planets,
        favCharacters: state.favCharacters,
        currentPage: state.currentPage,
        totalPage: state.totalPage,
        initializeState,
        onSearch,
        searchCharactersByName,
        onFavoriteToggle,
        onDetailClick,
        getCharactersData,
        onPageChange,
    };
};
