import { Menu as MenuIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type ToggleButtonProps = {
    onToggle?: () => void;
};

export const ToggleButton = ({ onToggle }: ToggleButtonProps) => (
    <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        sx={{ mr: 2, display: { sm: 'none' } }}
        onClick={onToggle}
    >
        <MenuIcon />
    </IconButton>
);
