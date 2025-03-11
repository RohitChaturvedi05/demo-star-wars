import { Paper, Typography } from '@mui/material';
import { styled } from 'styled-components';

const StyledFooter = styled(Paper)`
    padding: 1rem;
    text-align: center;
    margin-top: auto;
`;

export const Footer = () => (
    <StyledFooter elevation={3}>
        <Typography variant="body2" color="textSecondary">
            © 2024 Dashboard App. All rights reserved.
        </Typography>
    </StyledFooter>
);
