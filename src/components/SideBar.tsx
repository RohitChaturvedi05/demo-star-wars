import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { JSX } from 'react';
import { styled } from 'styled-components';
import { ToggleButton } from './ToggleButton';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)`
    width: ${drawerWidth}px;
    flex-shrink: 0;
    & .MuiDrawer-paper {
        position: unset;
        width: ${drawerWidth}px;
        box-sizing: border-box;
    }
`;

type MenuItem = {
    text: string;
    icon: JSX.Element;
    path: string;
};
type SidebarProps = {
    open?: boolean;
    onDrawerToggle?: () => void;
    onMenuItemClick: (item: MenuItem) => void;
    menuItems: MenuItem[];
};

export const Sidebar = ({
    open = false,
    menuItems,
    onDrawerToggle,
    onMenuItemClick,
}: SidebarProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <StyledDrawer
            open={open}
            variant={isMobile ? 'temporary' : 'permanent'}
            anchor="left"
        >
            <Toolbar>
                <ToggleButton onToggle={onDrawerToggle} />
            </Toolbar>
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        style={{ cursor: 'pointer' }}
                        itemType="button"
                        key={item.text}
                        onClick={() => onMenuItemClick(item)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </StyledDrawer>
    );
};
