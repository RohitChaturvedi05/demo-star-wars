import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Characters } from '../pages/Characters';

const Details = lazy(() => import('../pages/Details'));
const Favorites = lazy(() => import('../pages/Favorites'));

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
        </Routes>
    );
};
