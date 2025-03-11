import { Toolbar, Typography } from '@mui/material';
import { styled } from 'styled-components';
import { CharacterList } from '../components/CharacterList';
import { useCharactersData } from '../hooks/useCharactersData';

const PageContainer = styled.div`
    padding: 24px;
    width: 100%;
`;

export const Favorites = () => {
    const {
        planets,
        favorites,
        favCharacters,
        onFavoriteToggle,
        onDetailClick,
    } = useCharactersData();

    return (
        <>
            <Toolbar />
            <PageContainer>
                <Typography variant="h4" gutterBottom>
                    Star Wars Characters
                </Typography>
                <CharacterList
                    planets={planets}
                    characters={favorites}
                    favCharacters={favCharacters}
                    showPagination={false}
                    onFavoriteToggle={onFavoriteToggle}
                    onDetailClick={onDetailClick}
                />
            </PageContainer>
        </>
    );
};

export default Favorites;
