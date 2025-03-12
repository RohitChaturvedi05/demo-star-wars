import { Box } from '@mui/material';

export const Loader = () => {
    return (
        <Box
            data-testid="loader"
            sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}
        >
            Loading...
        </Box>
    );
};
