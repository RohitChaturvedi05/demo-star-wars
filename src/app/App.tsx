import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Sidebar } from '../components/SideBar';
import { AppRoutes } from '../routes';
import { MENU_ITEMS } from '../routes/constants';
import { StateProvider } from '../state';

const theme = createTheme();

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
const CentralContainer = styled.div`
    display: flex;
    flex: 1;
`;
const Main = styled.div`
    flex-grow: 1;
    position: relative;
`;

export const App = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setOpen((isOpen) => !isOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <StateProvider>
                <CssBaseline />
                <Container>
                    <Header onDrawerToggle={handleDrawerToggle} />
                    <CentralContainer>
                        <Sidebar
                            onMenuItemClick={(item) => navigate(item.path)}
                            menuItems={MENU_ITEMS}
                            open={open}
                            onDrawerToggle={handleDrawerToggle}
                        />
                        <Main>
                            <AppRoutes />
                        </Main>
                    </CentralContainer>
                    <Footer />
                </Container>
            </StateProvider>
        </ThemeProvider>
    );
};
