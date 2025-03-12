import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockCharacters, mockPlanets } from '../../__mocks__/charactersData';
import { useCharactersData } from '../../hooks/useCharactersData';
import { Characters } from '../Characters';

// Acceptance Criteria - Character list view
// o list all characters from the Star Wars universe (name, gender & home planet)
// o provide pagination controls to step through the results
// o provide a search field to query by character name
// o clicking a list entry should navigate to the character details page

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));
jest.mock('../../hooks/useCharactersData');

const MockUseCharactersData = {
    isLoading: false,
    characters: mockCharacters,
    planets: mockPlanets,
    currentPage: 1,
    totalPage: 3,
    favCharacters: [],
    debounceQuery: '',
    queryTerm: '',
    onSearch: jest.fn(),
    initializeState: jest.fn(),
    searchCharactersByName: jest.fn(),
    onPageChange: jest.fn(),
    getCharactersData: jest.fn(),
    onDetailClick: jest.fn(),
    onFavoriteToggle: jest.fn(),
};

describe('pages/Characters', () => {
    beforeEach(() => {
        (useCharactersData as jest.Mock).mockReturnValue(MockUseCharactersData);
    });

    it('should render without crashing', () => {
        const { container } = render(<Characters />);
        expect(container).toMatchSnapshot();
    });

    it('should render list of characters with name, gender and home planet', () => {
        render(<Characters />);

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('male')).toBeInTheDocument();
        expect(screen.getByText('Tatooine')).toBeInTheDocument();

        expect(screen.getByText('Leia Organa')).toBeInTheDocument();
        expect(screen.getByText('female')).toBeInTheDocument();
        expect(screen.getByText('Alderaan')).toBeInTheDocument();
    });

    it('should show pagination controls', () => {
        render(<Characters />);

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        const paginationButtons = screen.getAllByRole('button');
        expect(paginationButtons.length).toBeGreaterThan(0);
    });

    it('should handle pagination click', async () => {
        const { onPageChange } = useCharactersData();
        render(<Characters />);

        const nextPageButton = screen.getByRole('button', {
            name: /go to page 2/i,
        });
        fireEvent.click(nextPageButton);

        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('should provide search functionality', async () => {
        const { onSearch } = useCharactersData();
        render(<Characters />);

        const searchInput = screen.getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'Luke' } });

        await waitFor(
            () => {
                expect(onSearch).toHaveBeenCalledWith('Luke');
            },
            { timeout: 400 }
        );
    });

    it('should handle character detail navigation', () => {
        render(<Characters />);
        const uid = '1';
        const detailsBtn = screen.getByTestId(`btn-details-${uid}`);
        fireEvent.click(detailsBtn);
        expect(MockUseCharactersData.onDetailClick).toHaveBeenCalledWith(uid);
    });

    it('should show loading state', () => {
        (useCharactersData as jest.Mock).mockReturnValue({
            ...MockUseCharactersData,
            isLoading: true,
        });

        render(<Characters />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
});
