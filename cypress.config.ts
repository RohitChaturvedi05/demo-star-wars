// eslint-disable-next-line @typescript-eslint/no-require-imports
const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173', // Change based on your Vite dev server
    },
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
        supportFile: 'cypress/support/component.ts', // Ensure this path is correct
    },
});
