import { render, screen } from '@testing-library/react';
import { Characters } from '../../models/Character';
import { CharacterList, CharacterListProps } from '../CharacterList';

const mockProps: CharacterListProps = {
    characters: [],
    planets: {},
    favCharacters: [],
    showPagination: false,
    pagination: {
        currentPage: 1,
        totalPage: 1,
    },
    onFavoriteToggle: jest.fn(),
    onDetailClick: jest.fn(),
    onPageChange: jest.fn(),
};
const mockCharacters: Characters = [
    {
        birth_year: '19BBY',
        eye_color: 'blue',
        gender: 'male',
        hair_color: 'blond',
        height: '172',
        homeworld: '1',
        homeworldUrl: 'https://www.swapi.tech/api/planets/1',
        id: '5f63a36eee9fd7000499be42',
        mass: '77',
        name: 'Luke Skywalker',
        skin_color: 'fair',
        uid: '1',
    },
    {
        birth_year: '112BBY',
        eye_color: 'blue',
        gender: 'male',
        hair_color: 'blond',
        height: '172',
        homeworld: '2',
        homeworldUrl: 'https://www.swapi.tech/api/planets/2',
        id: 'asdsad21122',
        mass: '77',
        name: 'Darth Vader',
        skin_color: 'fair',
        uid: '2',
    },
];
describe('CharacterList', () => {
    it('should render without crashing', () => {
        const { container } = render(<CharacterList {...mockProps} />);
        expect(container).toMatchSnapshot();
    });

    it('should render list of characters when data is loaded', () => {
        render(<CharacterList {...mockProps} characters={mockCharacters} />);

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });

    it('should handle empty characters list', () => {
        render(<CharacterList {...mockProps} characters={[]} />);
        expect(screen.getByText(/No Records Found/i)).toBeInTheDocument();
    });
    it('should have pagination component when showPagination is true', () => {
        render(
            <CharacterList
                {...mockProps}
                characters={mockCharacters}
                showPagination
            />
        );
        expect(
            screen.getByTestId('character-list$pagination')
        ).toBeInTheDocument();
    });
});
