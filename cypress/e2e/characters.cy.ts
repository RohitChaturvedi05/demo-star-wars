describe('Page/Characters', () => {
    beforeEach(() => {
        cy.intercept(
            'GET',
            'https://www.swapi.tech/api/people?page=*&limit=*&expanded=true',
            {
                fixture: 'characters-page1.json',
            }
        ).as('getCharacters');
        cy.intercept(
            'GET',
            'https://www.swapi.tech/api/people?page=*&limit=10&name=*&expanded=true',
            {
                fixture: 'characters-search.json',
            }
        ).as('getSearch');

        cy.intercept('GET', 'https://www.swapi.tech/api/planets/*', {
            fixture: 'planet.json',
        }).as('getPlanet');

        cy.viewport(1003, 853);
        cy.visit('http://localhost:5173/');
    });

    describe('Page layout', () => {
        it("should have a header with the title 'Star Wars Characters'", () => {
            cy.get('h1').should('contain', 'Star Wars Characters');
        });

        it('should display the page title correctly', () => {
            cy.wait('@getCharacters');
            cy.get('h1').should('contain', 'Star Wars Characters');
        });

        it('should show loader while fetching data', () => {
            cy.get('[data-testid=loader]').should('be.visible');
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]').should('not.exist');
        });

        it('should display required columns for character list', () => {
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('[data-testid="character-list$head"]')
                .should('exist')
                .within(() => {
                    cy.get('th').eq(0).should('contain', '');
                    cy.get('th').eq(1).should('contain', 'Name');
                    cy.get('th').eq(2).should('contain', 'Gender');
                    cy.get('th').eq(3).should('contain', 'Home planet');
                    cy.get('th').eq(0).should('contain', '');
                });
        });

        it('should display 10 records in character list', () => {
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('[data-testid="character-list$body"]').within(() => {
                cy.get('tr').should('have.length', 10);
            });
        });

        it('should have nav links in sidebar', () => {
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('h1').should('contain', 'Star Wars Characters');
            cy.get('[data-testid="sidebar$Characters"]').should('exist');
            cy.get('[data-testid="sidebar$Favorites"]').should('exist');
        });

        it('should be responsive and adjust layout on small screens', () => {
            cy.viewport('iphone-6+');
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('h1').should('contain', 'Star Wars Characters');
            cy.get('[data-testid="sidebar$Characters"]').should('not.exist');
            cy.get('[data-testid="sidebar$Favorites"]').should('not.exist');
        });
    });

    describe('Routing', () => {
        it('should navigate to character details when clicking on a character', () => {
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            // cy.get('[data-testid="sidebar$Characters"]').should('exist');
            cy.get('[data-testid="sidebar$Favorites"]').should('exist').click();
            cy.wait(1000);
            cy.url().should('include', 'favorites');
        });
        it('should navigate to favorites page when clicking on favorites link', () => {
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
        });
        it('should navigate to characters page when clicking on a characters link', () => {
            cy.visit('/favorites');
            cy.get('[data-testid="sidebar$Characters"]', { timeout: 10000 })
                .should('exist')
                .click();
            cy.wait(1000);
            cy.url().should('include', '/');
        });
    });

    describe('Pagination', () => {
        it('should show pagination', () => {
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );

            cy.get('[data-testid="character-list$pagination"]')
                .should('exist')
                .within(() => {
                    cy.get('button').contains('1').should('exist');
                    cy.get('button').contains('9').should('exist');
                });
        });

        it('should change page when clicking pagination controls', () => {
            cy.wait('@getCharacters');

            cy.get('[data-testid="character-list$pagination"]', {
                timeout: 10000,
            })
                .should('exist')
                .within(() => {
                    cy.get('button').contains('2').should('exist').click();
                });

            cy.wait('@getCharacters');

            cy.get('[data-testid="character-list$pagination"]', {
                timeout: 10000,
            })
                .should('exist')
                .within(() => {
                    cy.get('button')
                        .contains('2')
                        .should('have.attr', 'aria-current', 'page');
                });
        });
    });

    describe('Favorites', () => {
        it('should toggle favorite status when clicking favorite button', () => {
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );

            cy.get('[data-testid="character-list$body"]')
                .should('exist')
                .within(() => {
                    // before clicking the button
                    cy.get('[data-testid="btn-fav-3"]')
                        .find('svg')
                        .get('[data-testid="StarBorderOutlinedIcon"]')
                        .should('exist');
                    cy.get('[data-testid="btn-fav-3"]').should('exist').click();

                    // after clicking the button
                    cy.wait(1000);
                    cy.get('[data-testid="btn-fav-3"]')
                        .find('svg')
                        .get('[data-testid="StarIcon"]')
                        .should('exist');
                    cy.get('[data-testid="btn-fav-3"]').should('exist').click();

                    // removing from favorite
                    cy.wait(1000);
                    cy.get('[data-testid="btn-fav-3"]')
                        .find('svg')
                        .get('[data-testid="StarBorderOutlinedIcon"]')
                        .should('exist');
                });
        });
        it('should show favorite item in favorites page', () => {
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('[data-testid="character-list$body"]')
                .should('exist')
                .within(() => {
                    // before clicking the button
                    cy.get('[data-testid="btn-fav-3"]')
                        .find('svg')
                        .get('[data-testid="StarBorderOutlinedIcon"]')
                        .should('exist');
                    cy.get('[data-testid="btn-fav-3"]').should('exist').click();
                });
            cy.get('[data-testid="sidebar$Favorites"]').should('exist').click();
            cy.url().should('include', 'favorites');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('[data-testid="character-list$body"]')
                .should('exist')
                .within(() => {
                    cy.get('td').should('contain', 'R2-D2');
                });
        });
        it('should remove favorite item from favorites page', () => {
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('[data-testid="character-list$body"]')
                .should('exist')
                .within(() => {
                    // before clicking the button
                    cy.get('[data-testid="btn-fav-3"]')
                        .find('svg')
                        .get('[data-testid="StarBorderOutlinedIcon"]')
                        .should('exist');
                    cy.get('[data-testid="btn-fav-3"]').should('exist').click();
                });
            cy.get('[data-testid="sidebar$Favorites"]').should('exist').click();
            cy.url().should('include', 'favorites');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('[data-testid="character-list$body"]')
                .should('exist')
                .within(() => {
                    cy.get('td').should('contain', 'R2-D2');
                    cy.get('[data-testid="btn-fav-3"]')
                        .find('svg')
                        .get('[data-testid="StarIcon"]')
                        .should('exist');
                    cy.get('[data-testid="btn-fav-3"]').should('exist').click();
                    cy.wait(1000);
                    cy.get('td').should('contain', 'No Records Found');
                });
        });
    });

    describe('Search', () => {
        it('should search for characters when typing in search box', () => {
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('[data-testid="search-box"]').should('be.visible');
        });
        it('should filter characters when typing', () => {
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('[data-testid="search-box"]').should('exist').type('Luke');
            cy.wait('@getSearch');
            cy.get('[data-testid="character-list$body"] tr').should(
                'have.length',
                1
            );
            cy.get('[data-testid="character-list$body"]').should(
                'contain',
                'Luke Skywalker'
            );
        });
        it('should clear search when clicking clear button', () => {
            cy.wait('@getCharacters');
            cy.get('[data-testid=loader]', { timeout: 10000 }).should(
                'not.exist'
            );
            cy.get('[data-testid="search-box"]').should('exist').type('Luke');
            cy.wait('@getSearch');
            cy.get('[data-testid="character-list$body"] tr').should(
                'have.length',
                1
            );
            cy.get('[data-testid="search-box"]').clear();
            cy.get('[data-testid="character-list$body"] tr').should(
                'have.length',
                10
            );
        });
    });

    describe('ErrorHandling', () => {
        it('should show No Records when api returns 404', () => {
            cy.intercept(
                'GET',
                'https://www.swapi.tech/api/people?page=*&limit=*&expanded=true',
                {
                    statusCode: 404,
                    body: {},
                }
            ).as('getCharacters');
            cy.reload();

            cy.get('[data-testid="no-records-found"]', {
                timeout: 10000,
            }).should('not.exist');
        });
    });
});
