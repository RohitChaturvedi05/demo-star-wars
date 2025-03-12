import ListAltIcon from '@mui/icons-material/ListAlt';
import StarFilled from '@mui/icons-material/Star';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import {
    Box,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import { useMemo } from 'react';
import { Characters, Planet } from '../models/Character';
import { State } from '../state/reducer';
import { Loader } from './Loader';

export type CharacterListProps = {
    characters: Characters;
    planets: Record<string, Planet>;
    favCharacters: State['favCharacters'];
    isLoading?: boolean;
    showPagination?: boolean;
    pagination?: {
        currentPage: number;
        totalPage: number;
    };
    onFavoriteToggle?: (id: string) => void;
    onDetailClick?: (id: string) => void;
    onPageChange?: (page: number) => void;
};

export const CharacterList = ({
    characters,
    favCharacters,
    pagination,
    showPagination = false,
    isLoading = false,
    planets,
    onFavoriteToggle,
    onDetailClick,
    onPageChange = () => {},
}: CharacterListProps) => {
    const shouldShowFavorite = !!onFavoriteToggle;
    const shouldShowDetails = !!onDetailClick;

    const displayCharacters = useMemo(() => {
        return characters.map(({ uid, name, gender, homeworld }) => {
            const isFav = favCharacters.includes(uid);
            return (
                <TableRow key={uid}>
                    <TableCell>
                        {shouldShowFavorite && (
                            <IconButton
                                data-testid={`btn-fav-${uid}`}
                                onClick={() => onFavoriteToggle(uid)}
                            >
                                {isFav && <StarFilled />}
                                {!isFav && <StarBorderOutlined />}
                            </IconButton>
                        )}
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{gender}</TableCell>
                    <TableCell>{planets[homeworld]?.name ?? ''}</TableCell>
                    {shouldShowDetails && (
                        <TableCell>
                            <IconButton
                                data-testid={`btn-details-${uid}`}
                                onClick={() => onDetailClick(uid)}
                            >
                                <ListAltIcon />
                            </IconButton>
                        </TableCell>
                    )}
                </TableRow>
            );
        });
    }, [
        characters,
        favCharacters,
        shouldShowFavorite,
        planets,
        shouldShowDetails,
        onFavoriteToggle,
        onDetailClick,
    ]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {shouldShowFavorite && <TableCell></TableCell>}
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Home planet</TableCell>
                        {shouldShowDetails && <TableCell></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {characters.length > 0 && !isLoading && displayCharacters}
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Loader />
                            </TableCell>
                        </TableRow>
                    )}
                    {characters.length === 0 && !isLoading && (
                        <TableRow>
                            <TableCell colSpan={4}>No Records Found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {showPagination && !isLoading && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2,
                    }}
                >
                    <Pagination
                        data-testid="character-list$pagination"
                        disabled={pagination?.totalPage === 0}
                        page={pagination?.currentPage ?? 0}
                        count={pagination?.totalPage ?? 0}
                        shape="rounded"
                        onChange={(_, page) => onPageChange(page)}
                    />
                </Box>
            )}
        </TableContainer>
    );
};
