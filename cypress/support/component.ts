import '@testing-library/cypress/add-commands';
import { mount } from 'cypress/react';

// Extend Cypress' Chainable interface to include "mount"
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }
    }
}

Cypress.Commands.add('mount', mount);
