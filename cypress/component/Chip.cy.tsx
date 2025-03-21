import { createTheme, ThemeProvider } from '@mui/material/styles';
import { mount } from 'cypress/react';
import { Chip } from '../../src/components/Chip';

const theme = createTheme();

describe('Chip Component', () => {
    it('renders with label and value', () => {
        mount(
            <ThemeProvider theme={theme}>
                <Chip label="Gender" value="Male" />
            </ThemeProvider>
        );

        cy.contains('Gender').should('be.visible');
        cy.contains('Male').should('be.visible');
    });
});
