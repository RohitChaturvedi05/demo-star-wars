import { Box, Toolbar, Typography } from '@mui/material';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import { CharacterList } from '../components/CharacterList';
import { Search } from '../components/Search';
import { useCharactersData } from '../hooks/useCharactersData';

const PageContainer = styled.div`
    padding: 24px;
    width: 100%;
`;
const ResponsiveBox = styled(Box)`
    display: flex;
    justify-content: space-between;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const Characters = () => {
    const {
        debounceQuery,
        isLoading,
        characters,
        currentPage,
        favCharacters,
        totalPage,
        planets,
        onSearch,
        initializeState,
        searchCharactersByName,
        onPageChange,
        onDetailClick,
        onFavoriteToggle,
    } = useCharactersData();

    useEffect(() => {
        (async () => {
            await initializeState();
        })();
        // need to initialize the state only once at the mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        (async () => {
            if (debounceQuery.length > 0) {
                await searchCharactersByName(debounceQuery);
            }
        })();
    }, [debounceQuery, searchCharactersByName]);

    return (
        <>
            <Toolbar />

            <PageContainer>
                <ResponsiveBox>
                    <Typography variant="h4" component="h1">
                        Star Wars Characters
                    </Typography>
                    <Search onSearch={onSearch} />
                </ResponsiveBox>

                <CharacterList
                    isLoading={isLoading}
                    planets={planets}
                    characters={characters}
                    favCharacters={favCharacters}
                    pagination={{
                        currentPage,
                        totalPage,
                    }}
                    showPagination
                    onFavoriteToggle={onFavoriteToggle}
                    onDetailClick={onDetailClick}
                    onPageChange={onPageChange}
                />
            </PageContainer>
        </>
    );
};
