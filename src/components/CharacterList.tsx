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

type CharacterListProps = {
    characters: Characters;
    planets: Record<string, Planet>;
    favCharacters: State['favCharacters'];
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
    planets,
    onFavoriteToggle,
    onDetailClick,
    onPageChange = () => {},
}: CharacterListProps) => {
    const shouldShowFavorite = !!onFavoriteToggle;
    const shouldShowDetails = !!onDetailClick;

    const displayCharacters = useMemo(() => {
        return characters.map(({ id, uid, name, gender, homeworld }) => {
            const isFav = favCharacters.includes(uid);
            return (
                <TableRow key={id}>
                    <TableCell>
                        {shouldShowFavorite && (
                            <IconButton onClick={() => onFavoriteToggle(uid)}>
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
                            <IconButton onClick={() => onDetailClick(uid)}>
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
                <TableBody>{displayCharacters}</TableBody>
            </Table>
            {showPagination && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2,
                    }}
                >
                    <Pagination
                        disabled={pagination?.totalPage === 0}
                        page={pagination?.currentPage ?? 0}
                        count={pagination?.totalPage ?? 0}
                        shape="rounded"
                        onChange={(e, page) => onPageChange(page)}
                    />
                </Box>
            )}
        </TableContainer>
    );
};
