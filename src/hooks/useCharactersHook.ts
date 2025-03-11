import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_PATH } from '../routes/constants';
import { useStateContext } from '../state';
import { ActionType } from '../state/actions';

export const useCharactersHook = () => {
    const { dispatch } = useStateContext();
    const navigate = useNavigate();

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

    return {
        onFavoriteToggle,
        onDetailClick,
    };
};
