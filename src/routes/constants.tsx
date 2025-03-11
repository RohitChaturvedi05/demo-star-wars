import { People, StarBorderOutlined } from '@mui/icons-material';

export const APP_PATH = {
    DEFAULT: '/',
    DETAILS: '/details',
    FAVORITES: '/favorites',
};

export const MENU_ITEMS = [
    { text: 'Characters', icon: <People />, path: APP_PATH.DEFAULT },
    {
        text: 'Favorites',
        icon: <StarBorderOutlined />,
        path: APP_PATH.FAVORITES,
    },
];
