describe('Page/Details', () => {
    beforeEach(() => {
        // Intercept specific character details API call
        cy.intercept('GET', ' https://swapi.dev/api/people/*', {
            fixture: 'people.json',
        }).as('getCharacterDetail');

        // Intercept planet API call
        cy.intercept('GET', 'https://www.swapi.tech/api/planets/*', {
            fixture: 'planet.json',
        }).as('getPlanet');

        // Intercept planet API call
        cy.intercept('GET', 'https://swapi.dev/api/films/*', {
            fixture: 'films.json',
        }).as('getFilms');

        // Intercept planet API call
        cy.intercept('GET', 'https://swapi.dev/api/starships/*', {
            fixture: 'starships.json',
        }).as('getStarShips');

        cy.viewport(1003, 853);
        // Visit the character details page for character with ID 1
        cy.visit('http://localhost:5173/details/1');
    });

    describe('Page layout', () => {
        it.only('should show loader while fetching data', () => {
            cy.get('[data-testid=loader]').should('be.visible');
            cy.wait('@getCharacterDetail');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
        });

        it('should display the character name as the page title', () => {
            cy.wait('@getCharacterDetail');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('h1').should('contain', 'Luke Skywalker');
        });
    });
});
