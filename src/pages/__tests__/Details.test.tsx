import { fireEvent, screen } from '@testing-library/react';
import {
    mockCharacterDetails,
    mockFilms,
    mockPlanets,
    mockStarship,
} from '../../__mocks__/charactersData';
import { renderWithState } from '../../__mocks__/renderWithState';
import { useCharacterDetails } from '../../hooks/useCharacterDetails';
import Details from '../Details';

// Acceptance Criteria - Character details view
// o display: name, hair colour, eye colour, gender, and home planet
// o list the films that the character has appeared in
// o list the starships that the character has piloted
// o provide the ability to add the character to the favourites list if they aren’t already on it

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useParams: jest.fn().mockReturnValue({ id: '1' }),
}));
jest.mock('../../hooks/useCharacterDetails');

const MockUseCharactersDetailsData = {
    character: mockCharacterDetails,
    films: [...mockFilms],
    starShips: mockStarship,
    planets: mockPlanets,
    filmsNames: [{ name: mockFilms[0].title }, { name: mockFilms[1].title }],
    starShipsNames: [
        { name: mockStarship[0].name },
        { name: mockStarship[1].name },
    ],
    isFavorite: false,
    onAddToFavorites: jest.fn(),
    getCharacterDetails: jest.fn(),
};

describe('pages/Details', () => {
    beforeEach(() => {
        (useCharacterDetails as jest.Mock).mockReturnValue(
            MockUseCharactersDetailsData
        );
    });

    it('should render without crashing', () => {
        const { container } = renderWithState(<Details />);
        expect(container).toMatchSnapshot();
    });

    it('should render character details with name, gender and home planet', () => {
        renderWithState(<Details />);

        expect(screen.getByText(mockCharacterDetails.name)).toBeInTheDocument();
        expect(
            screen.getByText(mockCharacterDetails.gender)
        ).toBeInTheDocument();
        expect(
            screen.getByText(mockCharacterDetails.eye_color)
        ).toBeInTheDocument();
        expect(
            screen.getByText(mockCharacterDetails.hair_color)
        ).toBeInTheDocument();
        expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });
    it('should render list of films', () => {
        renderWithState(<Details />);
        expect(screen.getByText('Films')).toBeInTheDocument();
        MockUseCharactersDetailsData.filmsNames.forEach(({ name }) => {
            expect(screen.getByText(name)).toBeInTheDocument();
        });
    });
    it('should render list of starships', () => {
        renderWithState(<Details />);
        expect(screen.getByText('StarShips')).toBeInTheDocument();
        MockUseCharactersDetailsData.starShipsNames.forEach(({ name }) => {
            expect(screen.getByText(name)).toBeInTheDocument();
        });
    });

    it('should add/remove from favorites', () => {
        renderWithState(<Details />);
        const favBtn = screen.getByRole('button');
        expect(favBtn).toBeInTheDocument();
        fireEvent.click(favBtn);
        expect(
            MockUseCharactersDetailsData.onAddToFavorites
        ).toHaveBeenCalledWith(mockCharacterDetails.id);
    });
});
