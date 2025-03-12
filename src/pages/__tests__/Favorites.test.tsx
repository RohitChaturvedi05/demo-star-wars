import { fireEvent, screen } from '@testing-library/react';
import {
    mockFavoriteCharacters,
    mockPlanets,
} from '../../__mocks__/charactersData';
import { renderWithState } from '../../__mocks__/renderWithState';
import { useCharactersData } from '../../hooks/useCharactersData';
import Favorites from '../Favorites';

// Acceptance Criteria - Favourites view
// o display all characters that have been added to the favourites list(name, height, gender & home planet)
// o provide the ability to remove characters from the list

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useParams: jest.fn().mockReturnValue({ id: '1' }),
}));
jest.mock('../../hooks/useCharactersData');

const MockUseCharactersData = {
    isLoading: false,
    characters: [],
    planets: mockPlanets,
    currentPage: 1,
    totalPage: 3,
    favCharacters: ['1'],
    favorites: mockFavoriteCharacters,
    searchCharactersByName: jest.fn(),
    onPageChange: jest.fn(),
    getCharactersData: jest.fn(),
    onDetailClick: jest.fn(),
    onFavoriteToggle: jest.fn(),
};

describe('pages/Favorites', () => {
    beforeEach(() => {
        (useCharactersData as jest.Mock).mockReturnValue(MockUseCharactersData);
    });

    it('should render without crashing', () => {
        const { container } = renderWithState(<Favorites />);
        expect(container).toMatchSnapshot();
    });
    it('should render list of characters with name, gender and home planet', () => {
        renderWithState(<Favorites />);
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('male')).toBeInTheDocument();
        expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });
    it('should add/remove from favorites', () => {
        renderWithState(<Favorites />);
        const favBtn = screen.getByTestId('btn-fav-1');
        fireEvent.click(favBtn);
        expect(MockUseCharactersData.onFavoriteToggle).toHaveBeenCalledWith(
            '1'
        );
    });
});
