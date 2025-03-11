import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from 'styled-components';
import { ToggleButton } from './ToggleButton';

const StyledAppBar = styled(AppBar)`
    z-index: ${(props) => props.theme.zIndex?.drawer + 1};
`;

type HeaderProps = {
    onDrawerToggle?: () => void;
};

export const Header = ({ onDrawerToggle }: HeaderProps) => (
    <StyledAppBar position="fixed">
        <Toolbar>
            <ToggleButton onToggle={onDrawerToggle} />
            <Typography variant="h6" noWrap component="div">
                Demo Star Wars App
            </Typography>
        </Toolbar>
    </StyledAppBar>
);
