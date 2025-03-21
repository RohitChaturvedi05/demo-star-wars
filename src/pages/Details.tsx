import StarFilled from '@mui/icons-material/Star';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Paper,
    Toolbar,
    Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Chip } from '../components/Chip';
import { ContentList } from '../components/ContentList';
import { EditableChip } from '../components/EditableChip';
import { Gender } from '../components/Gender';
import { Loader } from '../components/Loader';
import { useCharacterDetails } from '../hooks/useCharacterDetails';

const testid = 'character-details';
export const Details = () => {
    const { id } = useParams<{ id: string }>();

    const {
        message,
        character,
        planets,
        filmsNames,
        starShipsNames,
        isFavorite,
        onGenderChange,
        onAddToFavorites,
        getCharacterDetails,
    } = useCharacterDetails();

    useEffect(() => {
        if (id) getCharacterDetails(id);
        // need to initialize the state only once at the mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Toolbar />
            {!character && <Loader />}
            {character && (
                <Container maxWidth="lg" sx={{ py: 4 }} data-testid={testid}>
                    {message && <span>{message}</span>}
                    <Card elevation={3}>
                        <Box
                            sx={{
                                bgcolor: 'primary.main',
                                p: 3,
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="h1"
                                data-testid={`${testid}$name`}
                            >
                                {character.name}
                            </Typography>
                            <Button
                                data-testid={`${testid}$fav-btn`}
                                variant="contained"
                                color={isFavorite ? 'secondary' : 'primary'}
                                onClick={() => onAddToFavorites(character.id)}
                                startIcon={
                                    isFavorite ? (
                                        <StarFilled />
                                    ) : (
                                        <StarBorderOutlined />
                                    )
                                }
                                sx={{
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    '&:hover': {
                                        bgcolor: 'grey.100',
                                    },
                                }}
                            >
                                Add/Remove Favorites
                            </Button>
                        </Box>
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        color="primary"
                                    >
                                        Character Details
                                    </Typography>
                                    <Paper
                                        data-testid={`${testid}$details`}
                                        elevation={0}
                                        sx={{ p: 3, bgcolor: 'grey.50' }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Chip
                                                    value={character.hair_color}
                                                    label="Hair Color"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Chip
                                                    value={character.eye_color}
                                                    label="Eye Color"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Gender
                                                    value={character.gender}
                                                    onGenderChange={(
                                                        value: Gender
                                                    ) =>
                                                        onGenderChange(
                                                            value,
                                                            character.id
                                                        )
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <EditableChip
                                                    label="Height"
                                                    value={character.height}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Chip
                                                    value={
                                                        planets[
                                                            character.homeworld
                                                        ]?.name ?? 'Unknown'
                                                    }
                                                    label="Home Planet"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        color="primary"
                                    >
                                        Related Content
                                    </Typography>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 1,
                                            bgcolor: 'grey.50',
                                        }}
                                    >
                                        <ContentList
                                            data-testid={`${testid}$films`}
                                            label="Films"
                                            data={filmsNames}
                                        />
                                        <Divider sx={{ my: 2 }} />
                                        <ContentList
                                            data-testid={`${testid}$star-ships`}
                                            label="StarShips"
                                            data={starShipsNames}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            )}
        </>
    );
};

export default Details;
