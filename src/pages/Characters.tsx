import { Box, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { CharacterList } from '../components/CharacterList';
import { Loader } from '../components/Loader';
import { Search } from '../components/Search';
import { useCharactersData } from '../hooks/useCharactersData';
import { useDebounce } from '../hooks/useDebounce';

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
    const [name, setName] = useState('');
    const debouncedName = useDebounce(name, 300);

    const {
        isLoading,
        characters,
        currentPage,
        favCharacters,
        totalPage,
        planets,
        searchCharactersByName,
        onPageChange,
        getCharactersData,
        onDetailClick,
        onFavoriteToggle,
    } = useCharactersData();

    useEffect(() => {
        (async () => {
            if (debouncedName.length > 0) {
                await searchCharactersByName(debouncedName);
                return;
            }
            await getCharactersData(currentPage);
        })();
        // it is not necessary to add getCharactersData to the dependency array,
        // this will also ensure that the search is triggered only when the currentPage & debouncedName changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, debouncedName]);

    return (
        <>
            <Toolbar />

            <PageContainer>
                <ResponsiveBox>
                    <Typography variant="h4" component="h1">
                        Star Wars Characters
                    </Typography>
                    <Search onSearch={setName} />
                </ResponsiveBox>

                {isLoading && <Loader />}
                {!isLoading && (
                    <CharacterList
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
                )}
            </PageContainer>
        </>
    );
};
