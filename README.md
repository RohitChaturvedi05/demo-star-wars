# Demo Star Wars Application

## Steps to setup the project

-   Install dependencies using `npm install`

-   Run `npm start` to start the project

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\

## Project Structure

```
demo-star-wars/
├── src/
│   ├── app/           # Root component
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── models/        # Data models and interfaces
│   ├── pages/         # Route-level components/pages
│   ├── routes/        # Route definitions
│   ├── services/      # API and external service integrations
│   ├── state/         # State management files
│   └── index.tsx      # Entry point
├── public/            # Static assets
└── package.json       # Project dependencies and scripts
```

## State Management

The application uses React's built-in state management solutions:

-   React's built-in `useState` and `useReducer` hooks
-   Context API for app-wide state management
-   Organized in `store` directory with separate contexts for:
    -   Character data
    -   Search filters

## Key Pages

### Characters Page (pages/Characters.tsx)

Main landing page that displays a grid of Star Wars characters with the following features:

-   Character search with debounced input
-   Pagination support for browsing all characters
-   Responsive grid layout
-   Quick actions to favorite/view details for each character
-   Displays character's Name, Gender & Home planet
-   Loading state handling

### Character Details Page (pages/Details.tsx)

Detailed view of a single character showing:

-   Character's personal information (name, hair color, eye color, gender)
-   Home planet details
-   List of films the character appears in
-   List of starShips associated with the character
-   Option to add/remove from favorites
-   Loading state for data fetching

### Favorites Page (pages/Favorites.tsx)

Dedicated page for managing favorite characters:

-   Displays all marked favorite characters in a grid
-   Shares the same grid layout as the main characters page
-   Allows quick removal from favorites

## Future Enhancements

1. Performance Optimizations

-   Implement virtual scrolling for large character lists

2. Feature Additions

-   Add sorting capabilities by various character attributes
-   Implement advanced filtering options
-   Add character comparison functionality
-   Include more character details like species and vehicles
-   Add share functionality for character profiles

3. User Experience

-   Add animations for state transitions
-   Implement dark/light theme toggle
-   Add keyboard navigation support
-   Include accessibility improvements
